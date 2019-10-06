import ApolloClient from 'Apollo/client'
import gql from 'graphql-tag'
import { ME_QUERY } from '../queries/me'

const updateUserReflectionTime = (deviceId, reflectionTimeHour, reflectionTimeMin) => {
    // ApolloClient.writeData({
    //     data: { me: { __typename: 'User', reflectionTimeHour, reflectionTimeMin } }
    // })
    return ApolloClient.mutate({
        variables: { deviceId, reflectionTimeHour, reflectionTimeMin },
        mutation: gql`
            mutation UpdateUserReflectionTime(
                $deviceId: String!
                $reflectionTimeHour: Int!
                $reflectionTimeMin: Int!
            ) {
                updateUserReflectionTime(
                    deviceId: $deviceId
                    reflectionTimeHour: $reflectionTimeHour
                    reflectionTimeMin: $reflectionTimeMin
                ) {
                    reflectionPush {
                        reflectionTimeHour
                        reflectionTimeMin
                    }
                }
            }
        `,
        refetchQueries: [
            {
                query: ME_QUERY,
                variables: { deviceId }
            }
        ]
        // optimisticResponse: {
        //     __typename: 'Mutation',
        //     updateUserReflectionTime: {
        //         __typename: 'User',
        //         reflectionTimeHour,
        //         reflectionTimeMin
        //     }
        // }
    })
}

export default updateUserReflectionTime
