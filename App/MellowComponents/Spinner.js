// @flow
import React from 'react'
import Spinner from 'react-native-spinkit'
import { Colors } from 'Themes'

const LoadingSpinner = () => {
    return <Spinner size={30} color={Colors.Blue3} type="Circle" />
}

export default LoadingSpinner
