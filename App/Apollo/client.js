import AppConfig from 'Config/AppConfig'
import { ApolloClient } from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import Sentry from '@sentry/react-native'
import resolvers from './resolvers'
import typeDefs from './typeDefs'

export const cache = new InMemoryCache()

export const link = new HttpLink({
    uri: `${AppConfig.API_BASE_URI}/graphql`
})

export const client = new ApolloClient({
    cache,
    link,
    resolvers,
    typeDefs,
    onError: e => {
        console.log(e)
        Sentry.captureException(e)
    }
})

export default client
