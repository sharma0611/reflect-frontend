import React, { useState } from 'react'
import PinScreen from '../MellowContainers/PinScreen'
import useAppState from 'react-native-appstate-hook'
import Loading from '../MellowComponents/Loading'
import { usePin } from 'Hooks/useProfile'

const withPinProtection = Screen => props => {
    const [{ loading, isProtected }] = usePin()
    const [loggedIn, setLoggedIn] = useState(false)

    const login = () => {
        setLoggedIn(true)
    }

    const logout = () => {
        isProtected && setLoggedIn(false)
    }

    const { appState } = useAppState({
        onBackground: logout
    })

    return loading ? (
        <Loading />
    ) : loggedIn || !isProtected ? (
        <Screen {...props} />
    ) : (
        <PinScreen {...{ login }} />
    )
}

export default withPinProtection
