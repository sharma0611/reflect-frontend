// @flow
import { useState, useEffect } from 'react'
import {
    fetchDailyReflection,
    fetchCurrentStreak,
    listenToDailyReflectionCompleted
} from '../Controllers/FirebaseController'
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
        async function onSnapshot(querySnapshot) {
            if (querySnapshot.docs.length > 0) {
                const streak = await ActivityResponse.currentStreak()
                console.log(`👨‍🌾 => `, streak)
                setDailyReflection({
                    loading: false,
                    error: false,
                    dailyReflection: undefined,
                    completedDailyReflection: true,
                    streak
                })
            } else {
                const date = new Date()
                console.log(`👨‍🌾 => `, 'yo')
                const activity = await ActivityResponse.dailyReflection(date)
                console.log(`👨‍🌾 => `, activity)
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
