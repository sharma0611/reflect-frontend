import { useGlobal, useEffect, setGlobal } from 'reactn'
import firebase from '@react-native-firebase/app'
import initAuth from '@react-native-firebase/auth'
import initFirestore from '@react-native-firebase/firestore'
import initFunctions from '@react-native-firebase/functions'
import Purchases from 'react-native-purchases'
import get from 'lodash-es/get'

// reactn properties
export const INITIALIZED = 'initialized'
export const USER = 'user'
export const PROFILE = 'profile'
export const HAS_PRO = 'hasPro'

//init
export const auth = initAuth()
export const db = initFirestore()
export const functions = initFunctions()

// auth
const facebookProvider = firebase.auth.FacebookAuthProvider
const googleProvider = firebase.auth.GoogleAuthProvider
export const currentUser = () => auth.currentUser
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
export const profilesRef = () => db.collection('profiles')
export const profileRefFromId = id => id && profilesRef().doc(id)
export const profileRef = () => currentUser() && profilesRef().doc(currentUser().uid)

export const findOrCreateProfile = async user => {
    const { uid, email, displayName } = user
    const profile = { uid, email, displayName }
    const ref = profileRefFromId(uid)
    try {
        setGlobal({ profile })
        const doc = await ref.get()
        if (!doc.exists) ref.set(profile)
    } catch (err) {
        console.warn('Firebase error creating profile document:', err)
    }
}

export const deleteUser = async () => {
    const { uid } = currentUser()
    if (!uid) return
    const ref = profileRefFromId(uid)
    await ref.delete()
    await currentUser().delete()
}

// hooks

/**
 * returns values instantiated by useGlobalUserListener()
 * @returns {{ initialized, user, profile, hasPro }}
 */
export function useUser() {
    const [initialized] = useGlobal(INITIALIZED)
    const [user] = useGlobal(USER)
    const [profile] = useGlobal(PROFILE)
    const [hasPro] = useGlobal(HAS_PRO)

    return { initialized, user, profile, hasPro }
}

/**
 * listens for auth user and profile doc changes,
 * configuring initialized, user, profile, hasPro global state
 * @returns {{ initialized, user, profile, hasPro }}
 */
export function useGlobalUserListener() {
    const [initialized, setInitialized] = useGlobal(INITIALIZED)
    const [user, setUser] = useGlobal(USER)
    const [profile, setProfile] = useGlobal(PROFILE)
    const [hasPro, setHasPro] = useGlobal(HAS_PRO)

    const handler = async user => {
        setUser(user)

        // stop listening if user does not exist
        if (!user || !user.uid) {
            setProfile({})
            setHasPro(false)
            if (!initialized) setInitialized(true)
            return
        }

        // purchases
        Purchases.setDebugLogsEnabled(true)
        Purchases.setup('AsrJhdgHqgRWbbrENjMfQrpPAKarCQQb', user.uid)
        const pro = get(await Purchases.getPurchaserInfo(), 'entitlements.active.pro')
        setHasPro(!!pro)

        // listen for profile doc changes
        return profileRefFromId(user.uid).onSnapshot(
            doc => {
                setProfile(doc.data() || {})
                if (!initialized) setInitialized(true)
            },
            err => {
                console.warn('Firebase error listening to profile document:', err)
            }
        )
    }

    useEffect(() => auth.onAuthStateChanged(handler), [])

    return { initialized, user, profile, hasPro }
}

export default firebase
