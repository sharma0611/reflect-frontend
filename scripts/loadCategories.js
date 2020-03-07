const { GoogleSpreadsheet } = require('google-spreadsheet')
const admin = require('firebase-admin')
const API_KEY = 'AIzaSyAw_0_Cq34PwLQfG7q0q3vUo59Bq7I3VME'
const DOC_ID = '1fRvL7qpY9Lms_gGxqsDutYmHEqxrOaXzJKQpo9-jyu8'
const CATEGORY_SHEET_INDEX = 0
const ACTIVITY_SHEET_INDEX = 1
const waterfall = require('async/waterfall')

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

const fetchQuestionSheets = doc => {
    const numSheets = doc.sheetsByIndex.length
    const questionSheets = doc.sheetsByIndex.splice(ACTIVITY_SHEET_INDEX + 1, numSheets - 1)
    return questionSheets
}

const fetchQuestionSheetsByTitle = doc => {
    const numSheets = doc.sheetsByIndex.length
    const questionSheets = doc.sheetsByIndex.splice(ACTIVITY_SHEET_INDEX + 1, numSheets - 1)
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
            const docRef = db.collection('categories').doc(id)
            await docRef.set(rest)
        })
    )
}

const upsertActivities = async (db, activities) => {
    await Promise.all(
        activities.map(async ({ id, ...rest }) => {
            const docRef = db.collection('activities').doc(id)
            await docRef.set(rest)
        })
    )
}

const loadCategoriesAndQuestions = async () => {
    const db = getDbFromCreds()
    const doc = await fetchMasterSheet()

    const categories = await fetchCategories(doc)
    // upsertCategories(db, categories)

    // const activities = await fetchActivities(doc)
    // upsertActivities(db, activities)

    // now for each categoryId, get the question sheet, go row by row saving each to firestore & updating id column
    const questionSheets = fetchQuestionSheetsByTitle(doc)
    await waterfall(
        categories.map(({ id: categoryId }) => async () => {
            const questionSheet = questionSheets[categoryId]
            if (questionSheet.title !== 'activity') {
                return
            }
            const questions = await questionSheet.getRows()
            // await new Promise(r => setTimeout(r, 2000))
            await waterfall(
                questions.map(row => async () => {
                    // await new Promise(r => setTimeout(r, 2000))
                    const { id, remove, ...rest } = await convertRowToJson(questionSheet, row)
                    const questionData = { ...rest, categoryId }
                    if (remove) {
                        const docRef = db.collection('questions').doc(id)
                        await docRef.delete()
                        await row.delete()
                        return
                    }
                    if (id) {
                        // update
                        const docRef = db.collection('questions').doc(id)
                        await docRef.set(questionData)
                    } else {
                        // insert
                        const docRef = db.collection('questions').doc()
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

loadCategoriesAndQuestions()
