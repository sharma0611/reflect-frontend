import { useState, useEffect } from 'react'
import { getRandomQuestion } from '../Controllers/FirebaseController'
import * as Sentry from '@sentry/react-native'
import { Colors } from 'Themes'

export default function useActivities() {
    const [{ loading, error, dailyReflection }, setDailyReflection] = useState({
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
        const fetchData = async () => {
            try {
                const positive = await getRandomQuestion('positive')
                const retro = await getRandomQuestion('negative')
                const questions = [
                    {
                        header: 'Daily Mood',
                        questionText: 'How am I feeling today?',
                        useEmoji: true
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
                    questions,
                    name: 'Daily Reflection',
                    color: Colors.PastelPurple,
                    activityId: 'daily'
                }
                setDailyReflection({
                    loading: false,
                    error: false,
                    dailyReflection: activity
                })
            } catch (e) {
                onError(e)
            }
        }
        fetchData()
    }, [])
    return { loading, error, dailyReflection }
}
