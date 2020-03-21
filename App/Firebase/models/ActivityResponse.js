// @flow
import firestore from '@react-native-firebase/firestore'
import Model from './Model'
import Profile from './Profile'
import type { PaginatedResponse } from './Types'

const COLLECTION_NAME = 'activity_responses'

type fields = {
    activityType: string,
    color: string,
    entryIds: Array<string>,
    name: string,
    timestamp: Date,
    uid: string
}

class ActivityResponseModel extends Model {
    _getResponsesWithEntries = data => {
        return new Promise.all(
            data.map(async (doc, index) => {
                const activity = await mapDocToActivityResponse(doc)
                if (index === docs.length - 1) {
                    currLastDoc = doc
                }
                return activity
            })
        )
    }

    _getResponseWithEntries = async response => {
        const { entryIds, ...rest } = response
        const entries = await fetchEntries(entryIds)
        const activity = { ...rest, entries }
        return activity
    }

    userActivityResponsesQuery(): firestore.Query {
        const uid = Profile.uid()
        return this.collectionRef.where('uid', '==', uid)
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
        const responsesWithEntries = this._getResponsesWithEntries(data)
        return { data: responsesWithEntries, lastDoc }
    }
}

const ActivityResponse = new ActivityResponseModel(COLLECTION_NAME)
export default ActivityResponse
