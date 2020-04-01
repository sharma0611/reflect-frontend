import React, { useState } from 'react'
import PinScreen from '../MellowContainers/PinScreen'
import useAppState from 'react-native-appstate-hook'
import { usePin } from 'Hooks/useUser'

const withPinProtection = Screen => props => {
    const [{ isProtected }] = usePin()
    const [loggedIn, setLoggedIn] = useState(!isProtected)

    const login = () => {
        setLoggedIn(true)
    }

    const logout = () => {
        isProtected && setLoggedIn(false)
    }

    const { appState } = useAppState({
        onBackground: logout
    })

    return loggedIn ? <Screen {...props} /> : <PinScreen {...{ login }} />
}

export default withPinProtection
