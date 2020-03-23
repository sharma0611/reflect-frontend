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

    moods(startDate: Date, endDate: Date): Promise<Array<EntryFields>> {
        return this.dataFromQuery(this.moodsQuery(startDate, endDate))
    }

    mood = async (date: Date) => {
        const moods = await this.moods(date, date)
        if (moods.length === 0) {
            return moods[0]
        }
    }

    listenToMoods(
        startDate: Date,
        endDate: Date,
        onData: (data: Array<EntryFields>) => void,
        onError: (error: Error) => void
    ) {
        return this.listenToQuery(this.moodsQuery(startDate, endDate), onData, onError)
    }

    emptyMood = (date: Date) => {
        return {
            header: 'Daily Mood',
            questionText: 'How am I feeling today?',
            useEmoji: true,
            type: DAILY_MOOD,
            timestamp: date
        }
    }
}

const Entry = new EntryModel(COLLECTION_NAME)
export default Entry
