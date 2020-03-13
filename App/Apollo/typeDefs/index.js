import gql from 'graphql-tag'

const typeDefs = gql`
    extend type Query {
        profile: Profile
        activity(id: ID!): Activity
    }

    # extend type Mutation {}

    extend type Profile {
        id: ID
        uid: ID
        displayName: String
        email: String
        activityResponses: [ActivityResponse]
    }

    extend type ActivityResponse {
        id: ID
        uid: ID
        name: String
        activity: Activity
        entries: [Entry]
        entryIds: [ID]
    }

    extend type Entry {
        id: ID
        uid: ID
        header: Header
        caption: String
        category: Category
        question: Question
        timestamp: Date
    }

    extend type Activity {
        id: ID
        name: String
        subtitle: String
        color: String
        isPro: Boolean
        questions: [Question]
    }

    extend type Category {
        id: ID
        name: String
        ama: Boolean
        color: String
        isPro: Boolean
    }

    extend type Question {
        id: ID
        questionText: String
        category: Category
    }
`

export const PROFILE = 'Profile'
export const ACTIVITY_RESPONSE = 'ActivityResponse'

export default typeDefs
