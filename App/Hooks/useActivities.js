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
                    const { questionIds, published, ...restOfActivity } = getDocWithId(doc)
                    const rawQuestions = await new Promise.all(
                        questionIds.map(async qId => {
                            const question = await getQuestionFromId(qId)
                            return { ...question, questionId: qId }
                        })
                    )
                    const questions = rawQuestions.map(doc => ({
                        ...doc,
                        header: restOfActivity.name
                    }))
                    activities.push({ ...restOfActivity, questions })
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
