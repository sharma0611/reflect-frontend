// @flow
import firestore from '@react-native-firebase/firestore'
import mapValues from 'lodash-es/mapValues'
import moment from 'moment'

export const dateToTimestamp = (d: any) => (d instanceof Date ? firestore.Timestamp.fromDate(d) : d)
export const timestampToDate = (t: any) => (t instanceof firestore.Timestamp ? t.toDate() : t)
export const nowTimestamp = (): firestore.Timestamp => firestore.Timestamp.now()
export const nowDate = (): Date => new Date()
export const startOfDay = (date: Date) =>
    moment(date)
        .startOf('day')
        .toDate()
export const endOfDay = (date: Date) =>
    moment(date)
        .endOf('day')
        .toDate()

export const mapDateValuesToTimestamp = (obj: {}): {} => mapValues(obj, dateToTimestamp)
export const mapTimestampValuesToDate = (obj: {}): {} => mapValues(obj, timestampToDate)

export const orderObjectsByIds = (ids: Array<string>, objs: Array<any>): Array<any> => {
    return ids.map(id => {
        const obj = objs.find(o => o.id === id)
        return obj || { id }
    })
}
