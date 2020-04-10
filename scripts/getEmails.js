const admin = require('firebase-admin')
const { writeFile } = require('./jsontocsv')

const DEV = false // set this to false to ship to prod

// firebase collections
let PROFILES = 'profiles'

if (DEV) {
    const TEST = 'test_'
    PROFILES = TEST + PROFILES
}

const getDbFromCreds = () => {
    let serviceAccount = require('./credentials.json')
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    })
    const db = admin.firestore()
    return db
}

const getProfiles = async () => {
    const db = getDbFromCreds()
    const snapshot = await db.collection(PROFILES).get()
    const profileData = snapshot.docs.map(doc => doc.data())
    const profiles = profileData.map(({ email, displayName, uid }) => ({
        email,
        name: displayName && displayName.split(' ')[0],
        uid
    }))
    writeFile('profiles.csv', profiles)
}

getProfiles()
