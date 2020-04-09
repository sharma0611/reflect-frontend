// @flow
import { useState, useEffect } from 'react'
import ActivityResponse from 'Firebase/models/ActivityResponse'
import Entry from 'Firebase/models/Entry'
import Profile from 'Firebase/models/Profile'
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
        async function onData(mood) {
            const date = new Date()
            const isComplete = await ActivityResponse.isDailyReflectionCompleted(date)
            if (!isComplete) {
                // update the reflection with the mood from the other screen
                const activity = await ActivityResponse.dailyReflection(date)
                setDailyReflection({
                    loading: false,
                    error: false,
                    dailyReflection: activity,
                    completedDailyReflection: false
                })
            }
        }
        const date = new Date()
        return Entry.listenToMood(date, onData, onError)
    }, [])
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
        async function onData(scheme) {
            const date = new Date()
            const activity = await ActivityResponse.dailyReflection(date)
            const isComplete = await ActivityResponse.isDailyReflectionCompleted(date)
            const streak = await ActivityResponse.currentStreak()
            setDailyReflection({
                loading: false,
                error: false,
                dailyReflection: activity,
                completedDailyReflection: isComplete,
                streak
            })
        }
        return Profile.listenToSchema(onData, onError)
    }, [])
    return { loading, error, dailyReflection, completedDailyReflection, streak }
}
