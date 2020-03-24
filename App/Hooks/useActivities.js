//@flow
import { useState, useEffect } from 'react'
import Activity from 'Firebase/models/Activity'
import * as Sentry from '@sentry/react-native'
import type { ActivitySkeletonFields } from 'Firebase/models/Activity'

type State = {
    loading: boolean,
    error: string | boolean,
    activities: Array<ActivitySkeletonFields>
}

export default function useActivities() {
    const [{ loading, error, activities }, setActivities]: [State, Function] = useState({
        loading: true,
        error: false,
        activities: []
    })
    useEffect(() => {
        function onData(activities: Array<ActivitySkeletonFields>) {
            setActivities({ activities, loading: false, error: false })
        }
        function onError(err) {
            setActivities({
                activities: [],
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
