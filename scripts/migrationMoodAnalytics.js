const admin = require('firebase-admin')

const DEV = false // set this to false to ship to prod

// firebase collections
let CATEGORIES = 'categories'
let ACTIVITIES = 'activities'
let QUESTIONS = 'questions'
let EMOJIS = 'emojis'
let ENTRIES = 'entries'

if (DEV) {
    const TEST = 'test_'
    CATEGORIES = TEST + CATEGORIES
    ACTIVITIES = TEST + ACTIVITIES
    QUESTIONS = TEST + QUESTIONS
    EMOJIS = TEST + EMOJIS
    ENTRIES = TEST + ENTRIES
}

const getDbFromCreds = () => {
    let serviceAccount = require('./credentials.json')
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    })
    const db = admin.firestore()
    return db
}

const loadPositivitiesToMoodEntries = async () => {
    // get all moods
    const db = getDbFromCreds()
    const moodSnapshot = await db
        .collection(ENTRIES)
        .where('type', '==', 'dailyMood')
        .get()
    moodSnapshot.forEach(async docSnapshot => {
        const data = docSnapshot.data()
        if (!data.positivity) {
            const emoji = data.responseText
            const docRef = db.collection(EMOJIS).doc(emoji)
            const { positivity } = (await docRef.get()).data()
            db.collection(ENTRIES)
                .doc(docSnapshot.id)
                .update({ positivity })
        }
    })
}

loadPositivitiesToMoodEntries()
