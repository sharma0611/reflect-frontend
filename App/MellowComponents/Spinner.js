// @flow
import React from 'react'
import { Colors } from 'Themes'
import V from 'Components/V'
import Spinner from 'react-native-spinkit'

const Spin = () => {
    return (
        <V flex={1} jc="center" ai="center">
            <Spinner size={30} color={Colors.Blue3} type="Circle" />
        </V>
    )
}

export default Spin
