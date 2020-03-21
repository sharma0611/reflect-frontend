import { useState, useEffect } from 'react'
import {
    listenToActivities,
    getDataFromDocWithId,
    getQuestionFromId
} from '../Controllers/FirebaseController'
import * as Sentry from '@sentry/react-native'

// we get an activity & convert it to an empty Activity Response and keep it on the activity card
// so that it can directly be passed to the activity screen
const activityToActivityResponse = async doc => {
    const { questionIds, published, ...restOfActivity } = getDataFromDocWithId(doc)
    const rawQuestions = await new Promise.all(
        questionIds.map(async qId => {
            const question = await getQuestionFromId(qId)
            return { ...question, questionId: qId }
        })
    )
    const entries = rawQuestions.map(doc => ({
        ...doc,
        header: restOfActivity.name
    }))
    return { ...restOfActivity, entries }
}

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
                    const emptyActivityResponse = await activityToActivityResponse(doc)
                    activities.push(emptyActivityResponse)
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
