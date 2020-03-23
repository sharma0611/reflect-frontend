// @flow
import { useState, useEffect } from 'react'
import ActivityResponse from 'Firebase/models/ActivityResponse'
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
        async function onData(dailyReflectionComplete) {
            if (dailyReflectionComplete) {
                const streak = await ActivityResponse.currentStreak()
                setDailyReflection({
                    loading: false,
                    error: false,
                    dailyReflection: undefined,
                    completedDailyReflection: true,
                    streak
                })
            } else {
                const date = new Date()
                const activity = await ActivityResponse.dailyReflection(date)
                setDailyReflection({
                    loading: false,
                    error: false,
                    dailyReflection: activity,
                    completedDailyReflection: false
                })
            }
        }
        return ActivityResponse.listenToDailyReflectionCompleted(onData, onError)
    }, [])
    return { loading, error, dailyReflection, completedDailyReflection, streak }
}
