import { useState, useEffect } from 'react'
import { listenToMoods, getDataFromDocWithId } from '../Controllers/FirebaseController'
import * as Sentry from '@sentry/react-native'

export default function useMoods({ startDate, endDate }) {
    const [{ loading, error, moods }, setMoods] = useState({
        loading: true,
        error: false,
        moods: []
    })

    useEffect(() => {
        function onSnapshot(querySnapshot) {
            let moodData = []
            querySnapshot.forEach(doc => {
                moodData.push(getDataFromDocWithId(doc))
            })
            setMoods({ moods: moodData, error: false, loading: false })
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
            const unsubscribe = listenToMoods(startDate, endDate, onSnapshot, onError)
            return unsubscribe
        } catch (e) {
            onError(e)
        }
    }, [])
    return { loading, error, moods }
}
