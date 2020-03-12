import { useState, useEffect } from 'react'
import { cache, client as ApolloClient } from './client'
import { persistCache } from 'apollo-cache-persist'
import AsyncStorage from '@react-native-community/async-storage'

export default function useClientWithPersistedCache() {
    const [client, setClient] = useState(undefined)

    const setClientAndPersistCache = async () => {
        await persistCache({
            cache,
            storage: AsyncStorage,
            trigger: 'background'
        })

        setClient(ApolloClient)
    }

    useEffect(() => {
        setClientAndPersistCache()
    }, [])

    return client
}
