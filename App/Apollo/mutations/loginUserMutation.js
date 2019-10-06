import ApolloClient from 'Apollo/client'
import gql from 'graphql-tag'

const loginUser = deviceId => {
    return ApolloClient.mutate({
        variables: { deviceId },
        mutation: gql`
            mutation LoginUser($deviceId: String!) {
                loginUser(deviceId: $deviceId) {
                    id
                    userUuid
                    reflectionPush {
                        reflectionTimeHour
                        reflectionTimeMin
                    }
                }
            }
        `
    })
}

export default loginUser
