// @flow
import firestore from '@react-native-firebase/firestore'
import Model from './Model'
import Profile from './Profile'
import Entry from './Entry'
import type { PaginatedResponse } from './Types'
import type { EntryFields } from './Entry'

const COLLECTION_NAME = 'activity_responses'

type ActivityResponseFields = {
    activityType: string,
    color: string,
    entryIds: Array<string>,
    name: string,
    timestamp: Date,
    uid: string
}

type ActivityResponseWithEntriesFields = {
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
