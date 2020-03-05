import { useState, useEffect } from 'react'
import { listenToCategories } from '../Controllers/FirebaseController'
import * as Sentry from '@sentry/react-native'

export default function useCategories() {
    const [{ loading, error, categories }, setCategories] = useState({
        loading: true,
        error: false
    })
    useEffect(() => {
        function onSnapshot(querySnapshot) {
            let categories = []
            querySnapshot.forEach(doc => categories.push(doc.data()))
            setCategories({ categories, loading: false, error: false })
        }
        function onError(err) {
            setCategories({
                categories: undefined,
                loading: false,
                error: 'Error: Categories not found.'
            })
            Sentry.captureException(err)
        }
        try {
            const unsubscribe = listenToCategories(onSnapshot, onError)
            return unsubscribe
        } catch (e) {
            onError(e)
        }
    }, [])
    return { loading, error, categories }
}
