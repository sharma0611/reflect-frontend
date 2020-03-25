// @flow
import React from 'react'
import V from '../Components/V'
import Loading from 'MellowComponents/Loading'

export default function SplashScreen({ navigation }) {
    return (
        <V flex={1} bg="BabyBlueL">
            <Loading />
        </V>
    )
}
