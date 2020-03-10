import { useState, useEffect } from 'react'
import { listenToProfile, signOut } from '../Controllers/FirebaseController'
import * as Sentry from '@sentry/react-native'

export default function useProfile() {
    const [{ loading, error, profile }, setProfile] = useState({ loading: true, error: false })
    useEffect(() => {
        function onSnapshot(doc) {
            if (doc.exists) {
                setProfile({ profile: doc.data(), loading: false, error: false })
            } else {
                signOut()
            }
        }
        function onError(err) {
            setProfile({ profile: undefined, loading: false, error: 'Error: Profile not found.' })
            Sentry.captureException(err)
        }
        try {
            const unsubscribe = listenToProfile(onSnapshot, onError)
            return unsubscribe
        } catch (e) {
            onError(e)
        }
    }, [])
    return { loading, error, profile }
}
