import { useState, useEffect } from 'react'
import {
    listenToActivities,
    getDocWithId,
    getQuestionFromId
} from '../Controllers/FirebaseController'
import * as Sentry from '@sentry/react-native'

export default function useActivities() {
    const [{ loading, error, activities }, setActivities] = useState({
        loading: true,
        error: false
    })
    useEffect(() => {
        async function onSnapshot(querySnapshot) {
            let activities = []
            await new Promise.all(
                querySnapshot.docs.map(async doc => {
                    const activity = getDocWithId(doc)
                    const rawQuestions = await new Promise.all(
                        activity.questionIds.map(qId => getQuestionFromId(qId))
                    )
                    const questions = rawQuestions.map(doc => ({ ...doc, header: activity.name }))
                    activities.push({ ...activity, questions })
                })
            )
            setActivities({ activities, loading: false, error: false })
        }
        function onError(err) {
            setActivities({
                activities: undefined,
                loading: false,
                error: 'Error: Activities not found.'
            })
            Sentry.captureException(err)
        }
        try {
            const unsubscribe = listenToActivities(onSnapshot, onError)
            return unsubscribe
        } catch (e) {
            onError(e)
        }
    }, [])
    return { loading, error, activities }
}
