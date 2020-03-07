import firebase from '@react-native-firebase/app'
import initAuth from '@react-native-firebase/auth'
import initFirestore from '@react-native-firebase/firestore'
import initFunctions from '@react-native-firebase/functions'

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

export const createUserWithEmailAndPassword = async ({ email, password, ...rest }) => {
    await auth.createUserWithEmailAndPassword(email, password)
    await finishSignUp({ ...rest })
}

export const signInWithEmailAndPassword = async ({ email, password, ...rest }) => {
    await auth.signInWithEmailAndPassword(email, password)
    await finishSignUp({ ...rest })
}

export const signInWithFacebookCredential = async ({ accessToken, ...rest }) => {
    await auth.signInWithCredential(facebookProvider.credential(accessToken))
    await finishSignUp({ ...rest })
}

export const signInWithGoogleCredential = async ({ idToken, accessToken, ...rest }) => {
    await auth.signInWithCredential(googleProvider.credential(idToken, accessToken))
    await finishSignUp({ ...rest })
}

export const finishSignUp = async ({ displayName = '' }) => {
    if (!auth.currentUser.displayName || displayName) {
        await auth.currentUser.updateProfile({ displayName })
    }
    await findOrCreateProfile()
}

// db
export const activitiesRef = db.collection(ACTIVITIES)
export const categoriesRef = db.collection(CATEGORIES)
export const questionsRef = db.collection(QUESTIONS)
export const adminsRef = db.collection(ADMINS)
export const profilesRef = db.collection(PROFILES)
export const activityResponsesRef = db.collection(ACTIVITY_RESPONSES)

export const getDataFromDocWithId = doc => ({ ...doc.data(), id: doc.id })
export const getDataFromRefWithId = async ref => {
    const doc = await ref.get()
    return getDataFromDocWithId(doc)
}

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
export const findOrCreateProfile = async () => {
    try {
        const { uid, email, displayName } = auth.currentUser
        const profile = { uid, email, displayName }
        const ref = profileRef(uid)
        const doc = await ref.get()
        return doc.exists ? await ref.update(profile) : await ref.set(profile)
    } catch (err) {
        console.warn('Error finding or creating profile:', err)
    }
}

export const fetchProfile = async () => {
    try {
        const { uid } = auth.currentUser
        const ref = profileRef(uid)
        const doc = await ref.get()
        return doc.data()
    } catch (err) {
        console.warn('Error fetching profile:', err)
    }
}

export const listenToProfile = (onSnapshot, onError) => {
    const { uid } = auth.currentUser
    const ref = profileRef(uid)
    return ref.onSnapshot(onSnapshot, onError)
}

export const updateProfile = async ({ displayName }) => {
    try {
        const { uid } = auth.currentUser
        const ref = profileRef(uid)
        return await ref.update({ displayName })
    } catch (err) {
        console.warn('Error fetching profile:', err)
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

export const fetchCategories = async () => {
    const categoriesRef = db.collection(CATEGORIES)
    const docs = await categoriesRef.where('ama', '==', true).get()
    const data = docs.map(doc => doc.data())
    return data
}

export const listenToCategories = (onSnapshot, onError) => {
    const categoriesRef = db.collection(CATEGORIES)
    return categoriesRef.where('ama', '==', true).onSnapshot(onSnapshot, onError)
}

export const listenToActivities = (onSnapshot, onError) => {
    const activitiesRef = db.collection(ACTIVITIES)
    return activitiesRef.where('published', '==', true).onSnapshot(onSnapshot, onError)
}

export const listenToActivityResponses = (onSnapshot, onError, limit, lastDoc) => {
    const uid = currentUid()
    const activitiesRespRef = db.collection(ACTIVITY_RESPONSES)
    let query = activitiesRespRef.orderBy('timestamp').where('uid', '==', uid)
    if (lastDoc) {
        query = query.startAfter(lastDoc)
    }
    query = query.limit(limit)
    return query.onSnapshot(onSnapshot, onError)
}

export const fetchActivityResponsesDocs = async (limit, lastDoc) => {
    const uid = currentUid()
    const activitiesRespRef = db.collection(ACTIVITY_RESPONSES)
    let query = activitiesRespRef.where('uid', '==', uid).orderBy('timestamp', 'desc')
    if (lastDoc) {
        query = query.startAfter(lastDoc)
    }
    query = query.limit(limit)
    const querySnapshot = await query.get()
    return querySnapshot.docs
    // const data = docs.map(doc => doc.data())
}

export const getRandomQuestion = async categoryId => {
    const questionsRef = db.collection(QUESTIONS)
    const key = questionsRef.doc().id
    const greaterSnapshot = await questionsRef
        .where('categoryId', '==', categoryId)
        .where(initFirestore.FieldPath.documentId(), '>=', key)
        .limit(1)
        .get()
    let question
    if (greaterSnapshot.size > 0) {
        greaterSnapshot.forEach(doc => {
            question = getDataFromDocWithId(doc)
        })
    } else {
        const lessSnapshot = await questionsRef
            .where('categoryId', '==', categoryId)
            .where(initFirestore.FieldPath.documentId(), '<', key)
            .limit(1)
            .get()
        lessSnapshot.forEach(doc => {
            question = getDataFromDocWithId(doc)
        })
    }
    return question
}

export const getQuestionFromId = async id => {
    const questionsRef = db.collection(QUESTIONS)
    const questionRef = questionsRef.doc(id)
    const question = await refData(questionRef)
    return question
}

export const upsertActivityResponse = async activity => {
    const { id, ...rest } = activity
    const uid = currentUid()
    const activityResponse = { ...rest, uid }
    let docRef
    if (id) {
        docRef = db.collection(ACTIVITY_RESPONSES).doc(id)
        await docRef.set(activityResponse)
    } else {
        docRef = db.collection(ACTIVITY_RESPONSES).doc()
        await docRef.set({
            ...activityResponse,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
    }
    const doc = await docRef.get()
    const data = getDataFromDocWithId(doc)
    return data
}

export default firebase
