import { useState, useEffect } from 'react'
import Profile from '../Firebase/models/Profile'
import * as Sentry from '@sentry/react-native'

export default function useProfile() {
    const [{ loading, error, profile }, setProfile] = useState({ loading: true, error: false })
    useEffect(() => {
        function onData(data) {
            setProfile({ profile: data || undefined, loading: false, error: false })
        }
        function onError(err) {
            setProfile({ profile: undefined, loading: false, error: 'Error: Profile not found.' })
            Sentry.captureException(err)
        }
        try {
            const unsubscribe = Profile.listen(onData, onError)
            return unsubscribe
        } catch (e) {
            onError(e)
        }
    }, [])
    return { loading, error, profile }
}
