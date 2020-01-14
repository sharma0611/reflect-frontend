/**
 * @flow
 */
import React, { Component } from 'react'
import RootContainer from 'Containers/RootContainer'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'Apollo/client'
import { Provider as UnstatedProvider } from 'unstated'
import * as Sentry from '@sentry/react-native'

Sentry.init({
    dsn: 'https://578f3466d9ae487c9755bd9f1c7bb4c4@sentry.io/1878431'
})

type Props = {}

export default class App extends Component<Props> {
    render() {
        return (
            <ApolloProvider client={ApolloClient}>
                <UnstatedProvider>
                    <RootContainer />
                </UnstatedProvider>
            </ApolloProvider>
        )
    }
}
