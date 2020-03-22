// @flow
import firestore from '@react-native-firebase/firestore'
import Model from './Model'
import Profile from './Profile'
import { startOfDay, endOfDay } from '../helpers'

const COLLECTION_NAME = 'entries'
const DAILY_MOOD = 'dailyMood'

export type EntryFields = {
    caption?: string,
    categoryId: string,
    header: string,
    questionId: string,
    questionText: string,
    // Post Save Fields
    responseText?: string,
    timestamp?: Date,
    uid?: string,
    id?: string
}

class EntryModel extends Model {
    userQuery(): firestore.Query {
        const uid = Profile.uid()
        return this.collectionRef.where('uid', '==', uid)
    }

    moodsQuery(startDate?: Date, endDate?: Date) {
        let query = this.userQuery().where('type', '==', DAILY_MOOD)
        if (startDate) query = query.where('timestamp', '>=', startOfDay(startDate))
        if (endDate) query = query.where('timestamp', '<', endOfDay(endDate))
        return query
    }

    moods(startDate?: Date, endDate?: Date) {
        return this.moodsQuery(startDate, endDate)
    }

    listenToMoods(
        startDate?: Date,
        endDate?: Date,
        onData: (data: Array<{}>) => void,
        onError: (error: Error) => void
    ) {
        return this.listenToQuery(this.moodsQuery(startDate, endDate), onData, onError)
    }
}

const Entry = new EntryModel(COLLECTION_NAME)
export default Entry
