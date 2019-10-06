/**
 * @flow
 */
import React, { Component } from 'react'
import RootContainer from 'Containers/RootContainer'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'Apollo/client'
import { Provider as UnstatedProvider } from 'unstated'

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
