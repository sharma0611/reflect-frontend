import React from 'react'
import * as Animatable from 'react-native-animatable'
import { StyleSheet } from 'react-native'
import { Colors, Images } from 'Themes'
import V from 'Components/V'

const bounce = {
    0: {
        scale: 1.5
    },
    0.5: {
        scale: 2
    },
    1: {
        scale: 1.5
    }
}

const LoadingSpinner = () => (
    <V ai="center" jc="center" flex={1}>
        <Animatable.Image
            animation={bounce}
            easing="ease-in-out-quad"
            iterationCount="infinite"
            source={Images.tinyLogo}
            style={styles.loadingSpinner}
            duration={4000}
        />
    </V>
)

const styles = StyleSheet.create({
    loadingSpinner: {
        tintColor: Colors.BrandM,
        width: 180,
        resizeMode: 'contain'
    }
})

export default LoadingSpinner
