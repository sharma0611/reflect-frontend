import { useState, useEffect } from 'react'
// import { auth, profileRef } from '../Controllers/FirebaseController'
import { listenToProfile } from '../Controllers/FirebaseController'
// import useUser from './useUser'
import * as Sentry from '@sentry/react-native'

export default function useProfile() {
    // const { uid } = useUser()
    const [{ loading, error, profile }, setProfile] = useState({ loading: true, error: false })
    useEffect(() => {
        function onSnapshot(doc) {
            setProfile({ profile: doc.data(), loading: false, error: false })
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
