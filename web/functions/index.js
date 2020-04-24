const { dataFromQuery } = require('./src/helpers')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const fs = require('fs')

// export GOOGLE_APPLICATION_CREDENTIALS="/Users/mattiaseyram/personal/reflect-frontend/web/functions/serviceAccountKey.json"
admin.initializeApp({
    credential: admin.credential.applicationDefault()
})
const auth = admin.auth()
const db = admin.firestore()
const storage = admin.storage()
const bucket = storage.bucket()

// db
const adminsRef = db.collection('admins')
const activitiesRef = db.collection('activities')
const activityResponsesRef = db.collection('activity_responses')
const categoriesRef = db.collection('categories')
const emojisRef = db.collection('emojis')
const entriesRef = db.collection('entries')
const profilesRef = db.collection('profiles')
const questionsRef = db.collection('questions')
const referralsRef = db.collection('referrals')

const allData = async () => {
    const activities = await dataFromQuery(activitiesRef)
    const activityResponses = await dataFromQuery(activityResponsesRef)
    const categories = await dataFromQuery(categoriesRef)
    const emojis = await dataFromQuery(emojisRef)
    const entries = await dataFromQuery(entriesRef)
    const profiles = await dataFromQuery(profilesRef)
    const questions = await dataFromQuery(questionsRef)
    const referrals = await dataFromQuery(referralsRef)

    Object.values(entries).forEach(e => {
        const { id, categoryId } = e
        const c = categories[categoryId]
        entries[id] = { ...e, category: c }
    })

    Object.values(activityResponses).forEach(ar => {
        const { id, entryIds } = ar
        const es = entryIds && entryIds.map(entryId => entries[entryId])
        activityResponses[id] = { ...ar, entries: es }
    })

    Object.values(profiles).forEach(p => {
        const { id } = p
        const ars = Object.values(activityResponses).filter(ar => ar && ar.uid === id)
        profiles[id] = { ...p, activityResponses: ars }
    })

    return {
        activities,
        categories,
        emojis,
        profiles,
        questions,
        referrals
    }
}

const ALL = 'all.json'

exports.writeAllDataToStorage = functions.https.onCall(async (data, context) => {
    const all = await allData()
    const allStringified = JSON.stringify(all, null, 4)
    const file = bucket.file(ALL)
    await file.save(allStringified)
    return {}
})
