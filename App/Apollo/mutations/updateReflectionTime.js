//@flow
import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const UPDATE_REFLECTION_QUERY = gql`
    mutation UpdateReflectionTime(
        $deviceId: String!
        $reflectionTimeHour: Int!
        $reflectionTimeMin: Int!
    ) {
        updateUserReflectionTime(
            deviceId: $deviceId
            reflectionTimeHour: $reflectionTimeHour
            reflectionTimeMin: $reflectionTimeMin
        ) {
            id
            reflectionTimeHour
            reflectionTimeMin
        }
    }
`

const UpdateReflectionTime = props => (
    <Mutation {...props} query={UPDATE_REFLECTION_QUERY}>
        {payload => props.children(payload)}
    </Mutation>
)

export default UpdateReflectionTime
