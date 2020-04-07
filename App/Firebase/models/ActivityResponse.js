// @flow
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'
import Model from './Model'
import Profile from './Profile'
import Entry from './Entry'
import Question from './Question'
import { Colors } from 'Themes'
import { summary } from 'date-streaks'
import type { PaginatedResponse } from './Types'
import type { EntryFields } from './Entry'

const COLLECTION_NAME = 'activity_responses'

export type ActivityResponseFields = {
    activityType: string,
    color: string,
    entryIds: Array<string>,
    name: string,
    timestamp: Date,
    uid: string
}

export type ActivityResponseWithEntriesFields = {
    activityType: string,
    color: string,
    entries: Array<EntryFields>,
    name: string,
    timestamp: Date,
    uid: string,
    // post save
    id?: string
}

// Activity Types
const DAILY = 'daily'

class ActivityResponseModel extends Model {
    _getResponsesWithEntries = (
        responses: Array<ActivityResponseFields>
    ): Promise<Array<ActivityResponseWithEntriesFields>> => {
        return new Promise.all(
            responses.map(async response => {
                const responseWithEntry = await this._getResponseWithEntries(response)
                return responseWithEntry
            })
        )
    }

    _getResponseWithEntries = async (
        response: ActivityResponseFields
    ): Promise<ActivityResponseWithEntriesFields> => {
        const { entryIds, ...rest } = response
        const entries = await Entry.dataFromIds(entryIds)
        const activity = { ...rest, entries }
        return activity
    }

    userActivityResponsesQuery(): firestore.Query {
        const uid = Profile.uid()
        return this.collectionRef.where('uid', '==', uid).orderBy('timestamp', 'desc')
    }

    userStreakQuery(): firestore.Query {
        const uid = Profile.uid()
        return this.collectionRef.where('uid', '==', uid).where('activityType', '==', DAILY)
    }

    numberSaved = async (): Promise<number> => {
        const data = await this.dataFromQuery(this.userActivityResponsesQuery())
        return data.length
    }

    dailyReflectionQuery(date: Date): firestore.Query {
        const uid = Profile.uid()
        const start = moment(date)
            .startOf('day')
            .toDate()
        const end = moment(date)
            .endOf('day')
            .toDate()
        return this.collectionRef
            .where('uid', '==', uid)
            .where('timestamp', '>=', start)
            .where('timestamp', '<', end)
            .where('activityType', '==', DAILY)
            .limit(1)
    }

    userStreakData(): Promise<Array<ActivityResponseFields>> {
        return this.dataFromQuery(this.userStreakQuery())
    }

    currentStreak = async (): Promise<number> => {
        const data = await this.userStreakData()
        const dates = data.map(({ timestamp }) => {
            const date = moment(timestamp).format('MM/DD/YY')
            return new Date(date)
        })
        const { currentStreak } = summary({
            dates
        })
        return currentStreak
    }

    paginatedResponses = (
        limit: number,
        startAfter?: firestore.DocumentSnapshot
    ): Promise<PaginatedResponse> => {
        return this.dataFromPaginatedQuery(this.userActivityResponsesQuery(), limit, startAfter)
    }

    paginatedResponsesWithEntries = async (
        limit: number,
        startAfter?: firestore.DocumentSnapshot
    ): Promise<PaginatedResponse> => {
        const { data, lastDoc } = await this.paginatedResponses(limit, startAfter)
        const responsesWithEntries = await this._getResponsesWithEntries(data)
        return { data: responsesWithEntries, lastDoc }
    }

    listenToDailyReflectionCompleted(onData: (data: boolean) => void, onError: () => void) {
        const date = new Date()
        const onReflectionData = (reflectionData: Array<ActivityResponseFields>) => {
            const reflectionCompleted = reflectionData.length === 1
            onData(reflectionCompleted)
        }
        return this.listenToQuery(this.dailyReflectionQuery(date), onReflectionData, onError)
    }

    isDailyReflectionCompleted = async (date: Date) => {
        const data = await this.dataFromQuery(this.dailyReflectionQuery(date))
        return data.length === 1
    }

    dailyReflection = async (date: Date) => {
        // check if daily reflection exists
        const data = await this.dataFromQuery(this.dailyReflectionQuery(date))

        if (data.length === 1) {
            return data[0]
        } else {
            // otherwise create one
            // first check if daily mood exists, if it does, add it to the daily reflection
            let moodEntry = await Entry.mood(date)
            if (!moodEntry) {
                moodEntry = Entry.emptyMood(date)
            }
            const {
                id: positiveQid,
                order: positiveOrder,
                ...positive
            } = await Question.getRandomPositive()
            const {
                id: retroQid,
                order: negativeOrder,
                ...retro
            } = await Question.getRandomNegative()
            const entries = [
                moodEntry,
                {
                    header: 'Daily Mood',
                    questionText: 'What made me feel this way?'
                },
                {
                    header: 'Retrospective',
                    ...retro
                },
                {
                    header: 'Positive',
                    ...positive
                }
            ]

            const dailyReflection = {
                entries,
                name: 'Daily Reflection',
                color: Colors.PastelPurple,
                activityType: DAILY
            }
            return dailyReflection
        }
    }

    upsert = async (
        activity: ActivityResponseWithEntriesFields,
        date?: Date
    ): Promise<ActivityResponseWithEntriesFields> => {
        const { id, entries, ...rest } = activity
        const uid = Profile.uid()

        let timestamp = new Date()
        if (date) {
            timestamp = date
        }

        // set all entries
        const entriesWithIds = await new Promise.all(
            entries.map(entry => Entry.upsert(entry, timestamp))
        )
        const entryIds = entriesWithIds.map(({ id }) => id)

        // set activity responses with entry IDS
        const activityResponse = { ...rest, entryIds, uid }
        let docRef
        if (id) {
            docRef = await this.updateById(id, activityResponse)
        } else {
            docRef = await this.create({ ...activityResponse, timestamp })
        }
        const savedActivityResponse = await this.dataFromDocRef(docRef)

        const { entryIds: ids, ...restOfActivity } = savedActivityResponse
        return { ...restOfActivity, entries: entriesWithIds }
    }

    relatedResponsesQuery = (entryId: string) => {
        const uid = Profile.uid()
        return this.collectionRef
            .where('uid', '==', uid)
            .where('entryIds', 'array-contains', entryId)
    }

    cascadingDelete = async (id: string): Promise<void> => {
        const { entryIds } = await this.dataFromId(id)
        await Entry.deleteByIds(entryIds)
        await this.deleteById(id)
    }
}

const ActivityResponse = new ActivityResponseModel(COLLECTION_NAME)
export default ActivityResponse
