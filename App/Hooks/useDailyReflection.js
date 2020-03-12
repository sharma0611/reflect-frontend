import { useState, useEffect } from 'react'
import {
    getRandomQuestion,
    fetchCurrentStreak,
    listenToDailyReflectionCompleted,
    DAILY_MOOD
} from '../Controllers/FirebaseController'
import * as Sentry from '@sentry/react-native'
import { Colors } from 'Themes'

export default function useActivities() {
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
                const positive = await getRandomQuestion('positive')
                const retro = await getRandomQuestion('negative')
                const entries = [
                    {
                        header: 'Daily Mood',
                        questionText: 'How am I feeling today?',
                        useEmoji: true,
                        type: DAILY_MOOD
                    },
                    {
                        header: 'Daily Mood',
                        questionText: 'What made me feel this way?'
                    },
                    {
                        header: 'Retrospective',
                        ...retro
                    },
                    {
                        header: 'Positive',
                        ...positive
                    }
                ]
                const activity = {
                    entries,
                    name: 'Daily Reflection',
                    color: Colors.PastelPurple,
                    activityId: 'daily'
                }
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
