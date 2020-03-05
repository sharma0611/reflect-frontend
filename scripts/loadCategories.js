const { GoogleSpreadsheet } = require('google-spreadsheet')
const admin = require('firebase-admin')
const API_KEY = 'AIzaSyAw_0_Cq34PwLQfG7q0q3vUo59Bq7I3VME'
const DOC_ID = '1fRvL7qpY9Lms_gGxqsDutYmHEqxrOaXzJKQpo9-jyu8'
const CATEGORY_SHEET_INDEX = 0

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

const loadSheetAsJson = async sheet => {
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

const processCategoryJson = raw => {
    return raw.map(category => ({ ...category, isPro: Boolean(parseInt(category.isPro, 10)) }))
}

const loadCategories = async () => {
    const doc = getSheetWithCreds()
    await doc.loadInfo()

    const categorySheet = doc.sheetsByIndex[CATEGORY_SHEET_INDEX]
    const categoryRawJson = await loadSheetAsJson(categorySheet)
    const categoryJson = processCategoryJson(categoryRawJson)
    return categoryJson
}

loadCategories()
