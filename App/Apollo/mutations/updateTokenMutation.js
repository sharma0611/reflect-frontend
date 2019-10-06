import ApolloClient from 'Apollo/client'
import gql from 'graphql-tag'

const updateToken = (deviceId, pushToken) => {
    return ApolloClient.mutate({
        variables: { deviceId, pushToken },
        mutation: gql`
            mutation UpdateToken($deviceId: String!, $pushToken: String!) {
                updateToken(deviceId: $deviceId, pushToken: $pushToken) {
                    id
                }
            }
        `
    })
}

export default updateToken
