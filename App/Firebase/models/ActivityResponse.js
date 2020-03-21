// @flow
import Model from './Model'

const COLLECTION_NAME = 'activity_responses'

type fields = {
    activityType: string,
    color: string,
    entryIds: Array<string>,
    name: string,
    timestamp: Date,
    uid: string
}

class ActivityResponseModel extends Model {}

const ActivityResponse = new ActivityResponseModel(COLLECTION_NAME)
export default ActivityResponse
