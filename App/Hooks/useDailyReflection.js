import { useState, useEffect } from 'react'
import {
    fetchDailyReflection,
    fetchCurrentStreak,
    listenToDailyReflectionCompleted
} from '../Controllers/FirebaseController'
import * as Sentry from '@sentry/react-native'

export default function useDailyReflection() {
    const [
        { loading, error, dailyReflection, completedDailyReflection, streak },
        setDailyReflection
    ] = useState({
        loading: true,
        error: false
    })
    useEffect(() => {
        function onError(err) {
            setDailyReflection({
                dailyReflection: undefined,
                loading: false,
                error: 'Error: Daily Reflection not found.'
            })
            console.warn(err)
            Sentry.captureException(err)
        }
        async function onSnapshot(querySnapshot) {
            if (querySnapshot.docs.length > 0) {
                const streak = await fetchCurrentStreak()
                setDailyReflection({
                    loading: false,
                    error: false,
                    dailyReflection: undefined,
                    completedDailyReflection: true,
                    streak
                })
            } else {
                const date = new Date()
                const activity = await fetchDailyReflection(date)
                setDailyReflection({
                    loading: false,
                    error: false,
                    dailyReflection: activity,
                    completedDailyReflection: false
                })
            }
        }
        return listenToDailyReflectionCompleted(onSnapshot, onError)
    }, [])
    return { loading, error, dailyReflection, completedDailyReflection, streak }
}
