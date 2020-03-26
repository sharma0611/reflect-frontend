// @flow
import firestore from '@react-native-firebase/firestore'
import Model from './Model'
import Profile from './Profile'
import ActivityResponse from './ActivityResponse'
import { startOfDay, endOfDay } from '../helpers'

const COLLECTION_NAME = 'entries'
const DAILY_MOOD = 'dailyMood'

export type EntryFields = {
    caption?: string,
    categoryId: string,
    header: string,
    questionId: string,
    questionText: string,
    positivity: number,
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
        if (moods.length === 1) {
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

    listenToMood(
        date: Date,
        onData: (data?: EntryFields) => void,
        onError: (error: Error) => void
    ) {
        const onMoodsData = (moodsData: Array<EntryFields>): void => {
            if (moodsData.length === 1) {
                const mood = moodsData[0]
                onData(mood)
            }
            onData()
        }
        return this.listenToQuery(this.moodsQuery(date, date), onMoodsData, onError)
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

    upsert = async (entry: EntryFields, date: Date) => {
        const { id, ...rest } = entry
        const uid = Profile.uid()
        let timestamp = new Date()
        if (date) {
            timestamp = date
        }
        const entryResponse = { ...rest, uid }
        let docRef
        if (id) {
            docRef = await this.updateById(id, entryResponse)
        } else {
            docRef = await this.create({ ...entryResponse, timestamp })
        }
        const data = await this.dataFromDocRef(docRef)
        return data
    }

    cascadingDelete = async (id: string): Promise<void> => {
        const query = ActivityResponse.relatedResponsesQuery(id)
        let snapshot = await query.get()
        snapshot.forEach(activity =>
            activity.ref.update({
                entryIds: firestore.FieldValue.arrayRemove(id)
            })
        )
        await this.deleteById(id)
    }
}

const Entry = new EntryModel(COLLECTION_NAME)
export default Entry
