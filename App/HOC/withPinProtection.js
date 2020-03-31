import React, { useEffect, useState } from 'react'
import { createSwitchNavigator } from 'react-navigation'
import PinScreen from '../MellowContainers/PinScreen'
import Profile from 'Firebase/models/Profile'
import V from 'Components/V'
import T from 'Components/T'
import useAppState from 'react-native-appstate-hook'
import { usePin } from 'Hooks/useUser'

const withPinProtection = Screen => props => {
    const [{ hasPro, pin }, setPin] = usePin()
    const isProtected = hasPro && pin
    const [loggedIn, setLoggedIn] = useState(!isProtected)

    const login = () => {
        setLoggedIn(true)
    }

    const logout = () => {
        setLoggedIn(false)
    }

    const { appState } = useAppState({
        onBackground: logout
    })

    return loggedIn ? <Screen {...props} /> : <PinScreen {...{ pin, login }} />
}

export default withPinProtection
