import { useState, useEffect } from 'react'
import Category from '../Firebase/models/Category'
import * as Sentry from '@sentry/react-native'

export default function useCategories() {
    const [{ loading, error, categories }, setCategories] = useState({
        loading: true,
        error: false
    })
    useEffect(() => {
        function onData(data) {
            setCategories({ categories: [...data], loading: false, error: false })
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
            const unsubscribe = Category.listenToAMAs(onData, onError)
            return unsubscribe
        } catch (e) {
            onError(e)
        }
    }, [])
    return { loading, error, categories }
}
