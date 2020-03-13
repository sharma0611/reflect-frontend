import { PROFILE, ACTIVITY_RESPONSE } from '../typeDefs'
import { fetchProfile, fetchActivityResponses } from 'Controllers/FirebaseController'
import { withType, arrayWithType } from './helpers'

export default {
    Profile: {
        activityResponses: () => arrayWithType(fetchActivityResponses(), ACTIVITY_RESPONSE)
    },
    Query: {
        profile: () => withType(fetchProfile(), PROFILE)
    }
}
