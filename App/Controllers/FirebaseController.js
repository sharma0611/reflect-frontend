import { useGlobal, useEffect, setGlobal, useState } from 'reactn'
import firebase from '@react-native-firebase/app'
import initAuth from '@react-native-firebase/auth'
import initFirestore from '@react-native-firebase/firestore'
import initFunctions from '@react-native-firebase/functions'
import Purchases from 'react-native-purchases'
import get from 'lodash-es/get'

// reactn properties
export const INITIALIZED = 'initialized'
export const PROFILE_DETAILS = 'profileDetails'
export const HAS_PRO = 'hasPro'

// static db collections
export const ACTIVITIES = 'activities' // static activities like daily reflection
export const CATEGORIES = 'categories' // static question categories
export const QUESTIONS = 'questions' // static questions
// dynamic db collections
export const ADMINS = 'admins' // authenticated admin profiles for the web admin app
export const PROFILES = 'profiles' // authenticated user associated profiles
export const ACTIVITY_RESPONSES = 'activity_responses' // activity responses related to a user

//init
export const auth = initAuth()
export const db = initFirestore()
export const functions = initFunctions()

// auth
export const facebookProvider = firebase.auth.FacebookAuthProvider
export const googleProvider = firebase.auth.GoogleAuthProvider
export const currentUser = () => auth.currentUser
export const currentUid = () => auth.currentUser.uid
export const signOut = () => auth.signOut()

export const signInWithFacebookCredential = async token => {
    const { user } = await auth.signInWithCredential(facebookProvider.credential(token))
    await findOrCreateProfile(user)
    return user
}

export const signInWithGoogleCredential = async (idToken, accessToken) => {
    const { user } = await auth.signInWithCredential(
        googleProvider.credential(idToken, accessToken)
    )
    await findOrCreateProfile(user)
    return user
}

// db
export const activitiesRef = db.collection(ACTIVITIES)
export const categoriesRef = db.collection(CATEGORIES)
export const questionsRef = db.collection(QUESTIONS)
export const adminsRef = db.collection(ADMINS)
export const profilesRef = db.collection(PROFILES)
export const activityResponsesRef = db.collection(ACTIVITY_RESPONSES)

export const activityRef = id => id && activitiesRef.doc(id)
export const categoryRef = id => id && categoriesRef.doc(id)
export const questionRef = id => id && questionsRef.doc(id)
export const adminRef = id => id && adminsRef.doc(id)
export const profileRef = id => (id || currentUser()) && profilesRef.doc(id || currentUser().uid)
export const activityResponseRef = id => id && activityResponsesRef.doc(id)

// db helpers
export const nowTimestamp = () => firebase.firestore.FieldValue.serverTimestamp()
export const startOfToday = () =>
    new Date(firebase.firestore.Timestamp.now().toMillis() - 24 * 60 * 60 * 1000)
export const refData = async ref => (await ref.get()).data()

// db interactions
export const findOrCreateProfile = async user => {
    const { uid, email, displayName } = user
    const profile = { uid, email, displayName }
    const ref = profileRef(uid)
    try {
        const doc = await ref.get()
        if (!doc.exists) ref.set(profile)
        return profile
    } catch (err) {
        console.warn('Error creating profile:', err)
    }
}

export const deleteUser = async () => {
    const ref = profileRef()
    await ref.delete()
    await currentUser().delete()
}

export const findOrCloneActivityToResponse = async id => {
    try {
        const uid = currentUid()
        const ref = activityRef(id)
        if (!uid || !ref) return
        const activity = await ref.get()
        if (!activity.exists) return

        // find existing response for current day
        const query = await activityResponsesRef
            .where('uid', '==', uid)
            .where('activity_id', '==', activity.id)
            .orderBy('timestamp', 'desc')
            .where('timestamp', '>=', startOfToday())
            .limit(1)
            .get()

        if (!query.empty) return query.docs[0]

        const { name, question_ids = [] } = activity.data()

        // build entries
        const entries = await Promise.all(
            question_ids.map(async (question_id, index) => {
                const { question, category_id } = await refData(questionRef(question_id))
                const { name: category_name } = await refData(categoryRef(category_id))

                return {
                    question,
                    question_id,
                    category_id,
                    category_name,
                    index,
                    response: ''
                }
            })
        )

        // create new response
        const activityResponse = activityResponsesRef.doc()
        activityResponse.set({
            name,
            entries,
            activity_id: activity.id,
            uid,
            timestamp: nowTimestamp()
        })

        return activityResponse
    } catch (err) {
        console.warn('Error creating activity response:', err)
    }
}

export const updateActivityResponse = async (id, data) => {
    try {
        const ref = activityResponseRef(id)
        if (!ref) return
        await ref.update(data)
    } catch (err) {
        console.warn('Error updating activity response:', err)
    }
}

// hooks

/**
 * returns values instantiated by useGlobalUserListener()
 * @returns {{ initialized, user, profile, hasPro }}
 */
export function useUser() {
    const [initialized] = useGlobal(INITIALIZED)
    const [profileDetails] = useGlobal(PROFILE_DETAILS)
    const { hasPro, user, profile } = profileDetails

    return { initialized, user, profile, hasPro }
}

/**
 * listens for auth user and profile doc changes,
 * configuring initialized, user, profile, hasPro global state
 * @returns {{ initialized, user, profile, hasPro }}
 */
export function useGlobalUserListener() {
    const [initialized, setInitialized] = useGlobal(INITIALIZED)
    const [profileDetails, setProfileDetails] = useGlobal(PROFILE_DETAILS)

    const handler = async user => {
        // stop listening if user does not exist
        if (!user) {
            setProfileDetails({
                user: null,
                profile: null,
                hasPro: null
            })
            if (!initialized) setInitialized(true)
            return
        }

        // purchases
        Purchases.setDebugLogsEnabled(true)
        Purchases.setup('AsrJhdgHqgRWbbrENjMfQrpPAKarCQQb', user.uid)
        const pro = get(await Purchases.getPurchaserInfo(), 'entitlements.active.pro')
        const profile = await profileRef(user.uid).get()

        setProfileDetails({
            user,
            profile: profile.data(),
            hasPro: !!pro
        })
        if (!initialized) setInitialized(true)
    }

    useEffect(() => auth.onAuthStateChanged(handler), [])

    const { user, profile, hasPro } = profileDetails

    return { initialized, user, profile, hasPro }
}

export default firebase
