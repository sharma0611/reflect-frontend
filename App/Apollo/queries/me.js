//@flow
import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const ME_QUERY = gql`
    query Me($deviceId: String!) {
        me(deviceId: $deviceId) {
            reflectionPush {
                reflectionTimeHour
                reflectionTimeMin
            }
        }
    }
`

const Me = ({ deviceId, ...props }) => (
    <Query {...props} query={ME_QUERY} variables={{ deviceId }}>
        {payload => props.children(payload)}
    </Query>
)

export default Me
export { ME_QUERY }
