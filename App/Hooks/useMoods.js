import { useState, useEffect } from 'react'
import Entry from 'Firebase/models/Entry'
import * as Sentry from '@sentry/react-native'

export default function useMoods({ startDate, endDate }) {
    const [{ loading, error, moods }, setMoods] = useState({
        loading: true,
        error: false,
        moods: []
    })

    useEffect(() => {
        function onData(data) {
            setMoods({ moods: data, error: false, loading: false })
        }
        function onError(err) {
            setMoods({
                moods: undefined,
                loading: false,
                error: 'Error: Moods not found.'
            })
            Sentry.captureException(err)
        }
        try {
            const unsubscribe = Entry.listenToMoods(startDate, endDate, onData, onError)
            return unsubscribe
        } catch (e) {
            onError(e)
        }
    }, [])
    return { loading, error, moods }
}
