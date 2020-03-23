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
    uid: string
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

    dailyReflection = async (date: Date) => {
        // check if daily reflection exists
        const data = await this.dataFromQuery(this.dailyReflectionQuery(date))

        if (data.length === 1) {
            return data[0]
        } else {
            // otherwise create one
            // first check if daily mood exists, if it does, add it to the daily reflection
            let moodEntry = await Entry.mood(date)
            console.log(`👨‍🌾a => `, moodEntry)
            if (!moodEntry) {
                console.log(`👨‍🌾b => `, moodEntry)
                moodEntry = Entry.emptyMood(date)
            }
            const positive = await Question.getRandomPositive()
            const retro = await Question.getRandomNegative()
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
}

const ActivityResponse = new ActivityResponseModel(COLLECTION_NAME)
export default ActivityResponse
