// @flow
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'
import Model from './Model'
import Profile from './Profile'
import Entry from './Entry'
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
        return this.collectionRef.where('uid', '==', uid).where('activityType', '==', 'daily')
    }

    userStreakData(): Promise<Array<ActivityResponseFields>> {
        return this.dataFromQuery(this.userStreakQuery())
    }

    fetchCurrentStreak = async (): Promise<number> => {
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
}

const ActivityResponse = new ActivityResponseModel(COLLECTION_NAME)
export default ActivityResponse
