// @flow
import React, { useEffect } from 'react'
import LoadingSpinner from '../Components/LoadingSpinner'
import useUser from '../Hooks/useUser'

export default function SplashScreen({ navigation }) {
    // const { initialized, profile } = useUser()

    // useEffect(() => {
    //     if (initialized) navigation.dispatch(navigation.navigate(profile ? 'LoggedIn' : 'Onboarding'))
    // }, [initialized, profile])

    return <LoadingSpinner />
}
