const admin = require('firebase-admin')
const _ = require('lodash')
const moment = require('moment')

const dateToTimestamp = d => (d instanceof Date ? admin.firestore.Timestamp.fromDate(d) : d)
const timestampToDate = t => (t instanceof admin.firestore.Timestamp ? t.toDate() : t)
const nowTimestamp = () => admin.firestore.Timestamp.now()
const nowDate = () => new Date()
const startOfDay = date =>
    moment(date)
        .startOf('day')
        .toDate()
const endOfDay = date =>
    moment(date)
        .endOf('day')
        .toDate()

const inPast = date => date && date < nowDate()
const inFuture = date => date && date > nowDate()

const mapDateValuesToTimestamp = obj => _.mapValues(obj, dateToTimestamp)
const mapTimestampValuesToDate = obj => _.mapValues(obj, timestampToDate)

const orderObjectsByIds = (ids, objs) => {
    return ids.map(id => {
        const obj = objs.find(o => o.id === id)
        return obj || { id }
    })
}

const docData = doc => {
    return mapTimestampValuesToDate({ id: doc.id, ...doc.data() })
}

const dataFromDocRef = async ref => {
    return docData(await ref.get())
}

const arrayToObject = array => {
    let obj = {}
    array.forEach(element => {
        obj[element.id] = { ...element }
    })
    return obj
}

const dataFromQuery = async query => {
    const snapshot = await query.get()
    let docs = []
    snapshot.forEach(doc => {
        docs.push(docData(doc))
    })
    return arrayToObject(docs)
}

module.exports = {
    dateToTimestamp,
    timestampToDate,
    nowTimestamp,
    nowDate,
    startOfDay,
    endOfDay,
    inPast,
    inFuture,
    mapDateValuesToTimestamp,
    mapTimestampValuesToDate,
    orderObjectsByIds,
    docData,
    dataFromDocRef,
    dataFromQuery,
    arrayToObject
}
