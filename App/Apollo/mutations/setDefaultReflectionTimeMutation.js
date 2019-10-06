import ApolloClient from 'Apollo/client'
import gql from 'graphql-tag'

const setDefaultReflectionTime = (
    deviceId,
    defaultReflectionTimeHour,
    defaultReflectionTimeMin
) => {
    return ApolloClient.mutate({
        variables: { deviceId, defaultReflectionTimeHour, defaultReflectionTimeMin },
        mutation: gql`
            mutation SetDefaultReflectionTime(
                $deviceId: String!
                $defaultReflectionTimeHour: Int!
                $defaultReflectionTimeMin: Int!
            ) {
                setDefaultReflectionTime(
                    deviceId: $deviceId
                    defaultReflectionTimeHour: $defaultReflectionTimeHour
                    defaultReflectionTimeMin: $defaultReflectionTimeMin
                ) {
                    id
                }
            }
        `
    })
}

export default setDefaultReflectionTime
