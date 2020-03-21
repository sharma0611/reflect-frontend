import { useState, useEffect } from 'react'
import Activity from 'Firebase/models/Activity'
import * as Sentry from '@sentry/react-native'

export default function useActivities() {
    const [{ loading, error, activities }, setActivities] = useState({
        loading: true,
        error: false
    })
    useEffect(() => {
        function onData(activities) {
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
            const unsubscribe = Activity.listenToActivitySkeletons(onData, onError)
            return unsubscribe
        } catch (e) {
            onError(e)
        }
    }, [])
    return { loading, error, activities }
}
