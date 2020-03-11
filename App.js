/**
 * @flow
 */
import React, { setGlobal } from 'reactn'
import RootContainer from 'Containers/RootContainer'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'Apollo/client'
import * as Sentry from '@sentry/react-native'
import { USER, initialUserState } from './App/Hooks/useUser'

Sentry.init({
    dsn: 'https://578f3466d9ae487c9755bd9f1c7bb4c4@sentry.io/1878431'
})
// Set an initial global state directly:
setGlobal({
    name: '',
    [USER]: initialUserState
})

const App = () => {
    return (
        <ApolloProvider client={ApolloClient}>
            <RootContainer />
        </ApolloProvider>
    )
}

export default App
