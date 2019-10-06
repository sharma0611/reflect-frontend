import AppConfig from 'Config/AppConfig'
import { ApolloClient } from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

const cache = new InMemoryCache()
const link = new HttpLink({
    uri: `${AppConfig.API_BASE_URI}/graphql`
})

const client = new ApolloClient({
    cache,
    link,
    onError: e => {
        console.log(e)
    }
})

export default client
