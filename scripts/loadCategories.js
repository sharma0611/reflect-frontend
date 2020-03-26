const { GoogleSpreadsheet } = require('google-spreadsheet')
const admin = require('firebase-admin')
const API_KEY = 'AIzaSyAw_0_Cq34PwLQfG7q0q3vUo59Bq7I3VME'
const DOC_ID = '1fRvL7qpY9Lms_gGxqsDutYmHEqxrOaXzJKQpo9-jyu8'
const CATEGORY_SHEET_INDEX = 0
const ACTIVITY_SHEET_INDEX = 1
const EMOJI_SHEET_INDEX = 2
const waterfall = require('async/waterfall')

const DEV = true // set this to false to ship to prod

// firebase collections
let CATEGORIES = 'categories'
let ACTIVITIES = 'activities'
let QUESTIONS = 'questions'
let EMOJIS = 'emojis'

if (DEV) {
    const TEST = 'test_'
    CATEGORIES = TEST + CATEGORIES
    ACTIVITIES = TEST + ACTIVITIES
    QUESTIONS = TEST + QUESTIONS
    EMOJIS = TEST + EMOJIS
}

// Authentication
const getSheetWithKey = () => {
    const doc = new GoogleSpreadsheet(DOC_ID)
    doc.useApiKey(API_KEY)
    return doc
}

const getSheetWithCreds = async () => {
    const creds = require('./credentials.json') // the file saved above
    const doc = new GoogleSpreadsheet(DOC_ID)
    await doc.useServiceAccountAuth(creds)
    return doc
}

const getDbFromCreds = () => {
    let serviceAccount = require('./credentials.json')
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    })
    const db = admin.firestore()
    return db
}

const convertSheetToJson = async sheet => {
    await sheet.loadHeaderRow()
    const header = sheet.headerValues
    const rows = await sheet.getRows()
    const json = rows.map(row => {
        return header
            .map(key => ({
                [key]: row[key]
            }))
            .reduce((prevVal, currVal) => ({ ...prevVal, ...currVal }))
    })
    return json
}

const convertRowToJson = async (sheet, row) => {
    await sheet.loadHeaderRow()
    const header = sheet.headerValues
    return header
        .map(key => ({
            [key]: row[key] ? row[key] : ''
        }))
        .reduce((prevVal, currVal) => ({ ...prevVal, ...currVal }))
}

const intStringToBool = str => {
    return Boolean(parseInt(str, 10))
}

const stringToIdList = str => {
    return str.split(',').map(id => id.trim())
}

const deleteCollection = async (db, collection) => {
    let batch = db.batch()
    await db
        .collection(collection)
        .listDocuments()
        .then(val => {
            val.map(val => {
                batch.delete(val)
            })

            batch.commit()
        })
}

const processCategoryJson = raw => {
    return raw.map(category => ({
        ...category,
        isPro: intStringToBool(category.isPro),
        ama: intStringToBool(category.ama)
    }))
}

const processActivityJson = raw => {
    return raw.map(activity => ({
        ...activity,
        isPro: intStringToBool(activity.isPro),
        published: intStringToBool(activity.published),
        questionIds: stringToIdList(activity.questionIds)
    }))
}

const processEmojiJson = raw => {
    return raw.map((emoji, index) => ({
        ...emoji,
        positivity: parseFloat(emoji.positivity),
        order: index
    }))
}

const fetchMasterSheet = async () => {
    const doc = await getSheetWithCreds()
    await doc.loadInfo()
    return doc
}

const fetchCategories = async doc => {
    const categorySheet = doc.sheetsByIndex[CATEGORY_SHEET_INDEX]
    const categoryRawJson = await convertSheetToJson(categorySheet)
    const categoryJson = processCategoryJson(categoryRawJson)
    return categoryJson
}

const fetchActivities = async doc => {
    const activitySheet = doc.sheetsByIndex[ACTIVITY_SHEET_INDEX]
    const activityRawJson = await convertSheetToJson(activitySheet)
    const activityJson = processActivityJson(activityRawJson)
    return activityJson
}

const fetchEmojis = async doc => {
    const emojiSheet = doc.sheetsByIndex[EMOJI_SHEET_INDEX]
    const emojiRawJson = await convertSheetToJson(emojiSheet)
    const emojiJson = processEmojiJson(emojiRawJson)
    return emojiJson
}

const fetchQuestionSheets = doc => {
    const numSheets = doc.sheetsByIndex.length
    const questionSheets = doc.sheetsByIndex.splice(EMOJI_SHEET_INDEX + 1, numSheets - 1)
    return questionSheets
}

const fetchQuestionSheetsByTitle = doc => {
    const numSheets = doc.sheetsByIndex.length
    const questionSheets = doc.sheetsByIndex.splice(EMOJI_SHEET_INDEX + 1, numSheets - 1)
    return questionSheets
        .map(sheet => ({ [sheet.title]: sheet }))
        .reduce((prevVal, currVal) => ({ ...prevVal, ...currVal }))
}

const fetchQuestions = async doc => {
    const questionSheets = fetchQuestionSheets(doc)
    const questions = await Promise.all(
        questionSheets.map(async sheet => {
            const categoryQuestions = await convertSheetToJson(sheet)
            const categoryId = sheet.title
            return categoryQuestions.map(row => ({ ...row, categoryId }))
        })
    )
    return questions
}

// const questionRowToJson = async (sheet, row) => {
//     const json = await convertRowToJson(sheet, row)
// }

const upsertCategories = async (db, categories) => {
    await Promise.all(
        categories.map(async ({ id, ...rest }) => {
            const docRef = db.collection(CATEGORIES).doc(id)
            await docRef.set(rest)
        })
    )
}

const upsertActivities = async (db, activities) => {
    await Promise.all(
        activities.map(async ({ id, ...rest }) => {
            const docRef = db.collection(ACTIVITIES).doc(id)
            await docRef.set(rest)
        })
    )
}

const upsertEmojis = async (db, emojis) => {
    // wipe emojis
    await deleteCollection(db, EMOJIS)

    // upload emojis
    await Promise.all(
        emojis.map(async emoji => {
            const docRef = db.collection(EMOJIS).doc(emoji.emoji)
            if (docRef.exists) {
                console.log(`👨‍🌾 => `, emoji.emoji)
            }
            await docRef.set(emoji)
        })
    )
}

const loadCategoriesActivitiesEmojisQuestions = async () => {
    const db = getDbFromCreds()
    const doc = await fetchMasterSheet()

    const categories = await fetchCategories(doc)
    // upsertCategories(db, categories)

    // const activities = await fetchActivities(doc)
    // upsertActivities(db, activities)

    const emojis = await fetchEmojis(doc)
    await upsertEmojis(db, emojis)

    return
    // now for each categoryId, get the question sheet, go row by row saving each to firestore & updating id column
    const questionSheets = fetchQuestionSheetsByTitle(doc)

    await waterfall(
        categories.map(({ id: categoryId }) => async () => {
            const questionSheet = questionSheets[categoryId]
            // to do it just for one category:
            // if (questionSheet.title !== 'activity') {
            //     return
            // }
            if (!['career', 'school', 'travel', 'dreams'].includes(questionSheet.title)) {
                return
            }
            const questions = await questionSheet.getRows()
            await new Promise(r => setTimeout(r, 2000))
            await waterfall(
                questions.map((row, index) => async () => {
                    await new Promise(r => setTimeout(r, 2000))
                    const { id, remove, order, ...rest } = await convertRowToJson(
                        questionSheet,
                        row
                    )
                    const questionData = { ...rest, order: index, categoryId }
                    // removal process is now manual, delete the firestore question & sheet row
                    // if (remove) {
                    //     const docRef = db.collection(QUESTIONS).doc(id)
                    //     await docRef.delete()
                    //     await row.delete()
                    //     return
                    // }
                    if (id) {
                        // update
                        const docRef = db.collection(QUESTIONS).doc(id)
                        await docRef.set(questionData)
                        if (!order || parseInt(order, 10) !== index) {
                            // if the order is different or undef, update the order in the sheet (potentially from deleted rows)
                            row.order = index
                            await row.save()
                        }
                    } else {
                        // insert
                        const docRef = db.collection(QUESTIONS).doc()
                        await docRef.set(questionData)
                        // save id back to google sheet
                        row.id = docRef.id
                        await row.save()
                    }
                })
            )
        })
    )
}

loadCategoriesActivitiesEmojisQuestions()
