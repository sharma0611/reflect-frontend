import { PROFILE, ACTIVITY_RESPONSE } from '../typeDefs'
import { fetchProfile, fetchActivityResponses } from 'Controllers/FirebaseController'

const withType = async (data, type) => ({ ...(await data), __typename: type })
const arrayWithType = async (arr, type) => (await arr).map(item => ({ ...item, __typename: type }))

export default {
    Profile: {
        activityResponses: () => arrayWithType(fetchActivityResponses(), ACTIVITY_RESPONSE)
    },
    Query: {
        profile: () => withType(fetchProfile(), PROFILE)
    }
}
