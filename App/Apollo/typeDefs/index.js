import gql from 'graphql-tag'

const typeDefs = gql`
    extend type Query {
        profile: Profile
    }

    # extend type Mutation {}

    extend type Profile {
        id: ID
        displayName: String
        email: String
        activityResponses: [ActivityResponse]
    }

    extend type ActivityResponse {
        name: String
    }

    # extend type Activity {}
    # extend type Category {}
    # extend type Question {}
`

export const PROFILE = 'Profile'
export const ACTIVITY_RESPONSE = 'ActivityResponse'

export default typeDefs
