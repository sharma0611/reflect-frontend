import firebase from '@react-native-firebase/app'
import initAuth from '@react-native-firebase/auth'
import initFirestore from '@react-native-firebase/firestore'
import moment from 'moment'
import { Colors } from 'Themes'
import { summary } from 'date-streaks'
import Analytics from 'Controllers/AnalyticsController'

// static db collections
export const ACTIVITIES = 'activities' // static activities like daily reflection
export const CATEGORIES = 'categories' // static question categories
export const QUESTIONS = 'questions' // static questions
export const ENTRIES = 'entries' // journal entries

// dynamic db collections
export const ADMINS = 'admins' // authenticated admin profiles for the web admin app
export const PROFILES = 'profiles' // authenticated user associated profiles
export const ACTIVITY_RESPONSES = 'activity_responses' // activity responses related to a user

// journal types
export const DAILY_MOOD = 'dailyMood'

//init
export const auth = initAuth()
export const db = initFirestore()

// auth
export const facebookProvider = firebase.auth.FacebookAuthProvider
export const googleProvider = firebase.auth.GoogleAuthProvider
export const currentUser = () => auth.currentUser
export const currentUid = () => auth.currentUser.uid
export const signOut = () => auth.signOut()

export const createUserWithEmailAndPassword = async ({ email, password, ...rest }) => {
    await auth.createUserWithEmailAndPassword(email, password)
    await finishSignUp({ ...rest })
    Analytics.signIn('email')
}

export const signInWithEmailAndPassword = async ({ email, password, ...rest }) => {
    await auth.signInWithEmailAndPassword(email, password)
    await finishSignUp({ ...rest })
    Analytics.signIn('email')
}

export const signInWithFacebookCredential = async ({ accessToken, ...rest }) => {
    await auth.signInWithCredential(facebookProvider.credential(accessToken))
    await finishSignUp({ ...rest })
    Analytics.signIn('facebook')
}

export const signInWithGoogleCredential = async ({ idToken, accessToken, ...rest }) => {
    await auth.signInWithCredential(googleProvider.credential(idToken, accessToken))
    await finishSignUp({ ...rest })
    Analytics.signIn('google')
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
export const getDataFromRef = async ref => {
    const doc = await ref.get()
    return doc.data()
}

export const activityRef = id => id && activitiesRef.doc(id)
export const categoryRef = id => id && categoriesRef.doc(id)
export const questionRef = id => id && questionsRef.doc(id)
export const adminRef = id => id && adminsRef.doc(id)
export const profileRef = id => (id || currentUser()) && profilesRef.doc(id || currentUser().uid)
export const activityResponseRef = id => id && activityResponsesRef.doc(id)

// db helpers
export const nowTimestamp = () => firebase.firestore.Timestamp.now()
export const startOfToday = () => new Date(nowTimestamp().toMillis() - 24 * 60 * 60 * 1000)
export const refData = async ref => (await ref.get()).data()
export const dateToFirestoreTimestamp = date => firebase.firestore.Timestamp.fromDate(date)

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

export const fetchEntry = async id => {
    const docRef = db.collection(ENTRIES).doc(id)
    const doc = await docRef.get()
    return getDataFromDocWithId(doc)
}

const fetchEntries = async entryIds => {
    const entries = await new Promise.all(entryIds.map(fetchEntry))
    return entries
}

export const deleteSafeEntry = async id => {
    const uid = currentUid()
    const activitiesRespRef = db.collection(ACTIVITY_RESPONSES)
    let query = activitiesRespRef.where('uid', '==', uid).where('entryIds', 'array-contains', id)
    const snapshot = await query.get()
    snapshot.docs.forEach(activity =>
        activity.update({
            entryIds: firebase.firestore.FieldValue.arrayRemove(id)
        })
    )
    const docRef = db.collection(ENTRIES).doc(id)
    await docRef.delete()
}

const deleteRawEntry = async id => {
    const docRef = db.collection(ENTRIES).doc(id)
    await docRef.delete()
}

const deleteEntries = async entryIds => {
    await new Promise.all(entryIds.map(deleteRawEntry))
}

const mapDocToActivityResponse = async doc => {
    const { entryIds, ...rest } = getDataFromDocWithId(doc)
    const entries = await fetchEntries(entryIds)
    const activity = { ...rest, entries }
    return activity
}

export const fetchPaginatedActivityResponses = async (limit, lastDoc) => {
    const uid = currentUid()
    const activitiesRespRef = db.collection(ACTIVITY_RESPONSES)
    let query = activitiesRespRef.where('uid', '==', uid).orderBy('timestamp', 'desc')
    if (lastDoc) {
        query = query.startAfter(lastDoc)
    }
    query = query.limit(limit)
    const querySnapshot = await query.get()
    const docs = querySnapshot.docs
    let currLastDoc
    const activityResponses = await new Promise.all(
        docs.map(async (doc, index) => {
            const activity = await mapDocToActivityResponse(doc)
            if (index === docs.length - 1) {
                currLastDoc = doc
            }
            return activity
        })
    )
    return [activityResponses, currLastDoc]
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

export const upsertEntry = async (entry, date) => {
    const { id, ...rest } = entry
    const uid = currentUid()
    let timestamp = nowTimestamp()
    if (date) {
        timestamp = dateToFirestoreTimestamp(date)
    }
    const entryResponse = { ...rest, uid }
    let docRef
    if (id) {
        docRef = db.collection(ENTRIES).doc(id)
        await docRef.set(entryResponse)
    } else {
        docRef = db.collection(ENTRIES).doc()
        await docRef.set({
            ...entryResponse,
            timestamp
        })
    }
    const doc = await docRef.get()
    const data = getDataFromDocWithId(doc)
    return data
}

export const upsertActivityResponse = async (activity, date) => {
    const { id, entries, ...rest } = activity
    const uid = currentUid()

    let timestamp = nowTimestamp()
    if (date) {
        timestamp = dateToFirestoreTimestamp(date)
    }

    // set all entries
    const entriesWithIds = await new Promise.all(
        entries.map(entry => upsertEntry(entry, timestamp.toDate()))
    )
    const entryIds = entriesWithIds.map(({ id }) => id)

    // set activity responses with entry IDS
    const activityResponse = { ...rest, entryIds, uid }
    let docRef
    if (id) {
        docRef = db.collection(ACTIVITY_RESPONSES).doc(id)
        await docRef.set(activityResponse)
    } else {
        docRef = db.collection(ACTIVITY_RESPONSES).doc()
        await docRef.set({
            ...activityResponse,
            timestamp
        })
    }

    // return data with entries instead of just IDs
    const doc = await docRef.get()
    const { entryIds: ids, ...data } = getDataFromDocWithId(doc)
    return { ...data, entries: entriesWithIds }
}

export const deleteActivityResponse = async id => {
    const docRef = db.collection(ACTIVITY_RESPONSES).doc(id)
    // delete associated entries too
    const { entryIds } = await getDataFromRef(docRef)
    await deleteEntries(entryIds)
    await docRef.delete()
}

export const listenToDailyReflectionCompleted = (onSnapshot, onError) => {
    const uid = currentUid()
    const activitiesRespRef = db.collection(ACTIVITY_RESPONSES)
    const today = nowTimestamp().toDate()
    const startOfToday = moment(today)
        .startOf('day')
        .toDate()
    const query = activitiesRespRef
        .where('uid', '==', uid)
        .where('timestamp', '>=', startOfToday)
        .where('activityType', '==', 'daily')
    return query.onSnapshot(onSnapshot, onError)
}

// export const fetchCurrentStreak = async () => {
//     const uid = currentUid()
//     const activitiesRespRef = db.collection(ACTIVITY_RESPONSES)
//     let day = firebase.firestore.Timestamp.now().toDate()
//     let streak = 0
//     let pastNumEntries = 0
//     let startOfDay = moment(day)
//         .startOf('day')
//         .toDate()
//     let query = activitiesRespRef
//         .where('uid', '==', uid)
//         .where('timestamp', '>=', startOfDay)
//         .where('activityType', '==', 'daily')
//     let currNumEntries = (await query.get()).docs.length
//     while (currNumEntries > pastNumEntries) {
//         streak += 1
//         pastNumEntries = currNumEntries
//         startOfDay = moment(startOfDay)
//             .subtract(1, 'days')
//             .toDate()
//         query = activitiesRespRef
//             .where('uid', '==', uid)
//             .where('timestamp', '>=', startOfDay)
//             .where('activityType', '==', 'daily')
//         currNumEntries = (await query.get()).docs.length
//     }
//     return streak
// }

export const fetchCurrentStreak = async () => {
    const uid = currentUid()
    const activitiesRespRef = db.collection(ACTIVITY_RESPONSES)
    let query = activitiesRespRef.where('uid', '==', uid).where('activityType', '==', 'daily')
    const querySnapshot = await query.get()
    const dates = querySnapshot.docs.map(function(doc) {
        const date = moment(doc.data().timestamp.toDate()).format('MM/DD/YY')
        return new Date(date)
    })
    const { currentStreak, longestStreak, todayInStreak, withinCurrentStreak } = summary({
        dates
    })
    return currentStreak
}

export const listenToMoods = (startDate, endDate, onSnapshot, onError) => {
    const uid = currentUid()
    const entriesRef = db.collection(ENTRIES)

    const start = moment(startDate)
        .startOf('day')
        .toDate()
    const end = moment(endDate)
        .endOf('day')
        .toDate()

    const query = entriesRef
        .where('uid', '==', uid)
        .where('timestamp', '>=', start)
        .where('timestamp', '<', end)
        .where('type', '==', DAILY_MOOD)

    return query.onSnapshot(onSnapshot, onError)
}

export const fetchMoodEntry = async date => {
    const uid = currentUid()
    const entriesRef = db.collection(ENTRIES)

    const start = moment(date)
        .startOf('day')
        .toDate()
    const end = moment(date)
        .endOf('day')
        .toDate()

    const query = entriesRef
        .where('uid', '==', uid)
        .where('timestamp', '>=', start)
        .where('timestamp', '<', end)
        .where('type', '==', DAILY_MOOD)
        .limit(1)

    const snapshot = await query.get()
    let mood
    if (snapshot.docs.length === 1) {
        const doc = snapshot.docs[0]
        mood = getDataFromDocWithId(doc)
    }
    return mood
}

export const getEmptyMoodEntry = date => {
    const timestamp = dateToFirestoreTimestamp(date)
    return {
        header: 'Daily Mood',
        questionText: 'How am I feeling today?',
        useEmoji: true,
        type: DAILY_MOOD,
        timestamp
    }
}

export const fetchDailyReflection = async date => {
    const uid = currentUid()
    // check if daily reflection exists
    const activitiesRespRef = db.collection(ACTIVITY_RESPONSES)
    const start = moment(date)
        .startOf('day')
        .toDate()
    const end = moment(date)
        .endOf('day')
        .toDate()

    const query = activitiesRespRef
        .where('uid', '==', uid)
        .where('timestamp', '>=', start)
        .where('timestamp', '<', end)
        .where('activityType', '==', 'daily')
        .limit(1)

    const snapshot = await query.get()

    if (snapshot.docs.length === 1) {
        const dailyReflection = await mapDocToActivityResponse(snapshot.docs[0])
        return dailyReflection
    } else {
        // otherwise create one
        // first check if daily mood exists, if it does, add it to the daily reflection
        let moodEntry = await fetchMoodEntry(date)
        if (!moodEntry) {
            moodEntry = getEmptyMoodEntry(date)
        }
        const positive = await getRandomQuestion('positive')
        const retro = await getRandomQuestion('negative')
        const entries = [
            moodEntry,
            {
                header: 'Daily Mood',
                questionText: 'What made me feel this way?'
            },
            {
                header: 'Retrospective',
                ...retro
            },
            {
                header: 'Positive',
                ...positive
            }
        ]

        const dailyReflection = {
            entries,
            name: 'Daily Reflection',
            color: Colors.PastelPurple,
            activityType: 'daily'
        }
        return dailyReflection
    }
}

export default firebase
