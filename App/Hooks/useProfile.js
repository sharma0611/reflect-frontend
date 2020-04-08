import { useState, useEffect } from 'react'
import Profile from 'Firebase/models/Profile'
import useUser from 'Hooks/useUser'
import * as Sentry from '@sentry/react-native'

export default function useProfile() {
    const { uid } = useUser()
    const [{ loading, error, profile, hasPro, pin }, setProfile] = useState({
        loading: true,
        error: false
    })
    useEffect(() => {
        async function onData(data) {
            const hasPro = await Profile.pro(uid)
            const pin = await Profile.getPin(uid)
            setProfile({ profile: data, hasPro, pin, loading: false, error: false })
        }
        function onError(err) {
            setProfile({
                profile: undefined,
                hasPro: undefined,
                pin: undefined,
                loading: false,
                error: 'Error: Profile not found.'
            })
            Sentry.captureException(err)
        }
        try {
            const unsubscribe = Profile.listen(onData, onError, uid)
            return unsubscribe
        } catch (e) {
            onError(e)
        }
    }, [])
    return { loading, error, profile, hasPro, pin, uid }
}

export const usePin = () => {
    const { loading, hasPro, pin } = useProfile()
    const setPin = async newPin => {
        await Profile.updatePin(newPin)
    }
    const unsetPin = async () => {
        await Profile.unsetPin()
    }
    const checkPin = pinGuess => {
        return pinGuess === pin
    }
    const isProtected = hasPro && pin
    return [{ loading, isProtected }, setPin, unsetPin, checkPin]
}
