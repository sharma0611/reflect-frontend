// @flow
import React, { useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import { AppStyles, Metrics, Colors } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import Touchable from 'Components/Touchable'
import Spinner from 'react-native-spinkit'

type Props = {
    onPress: Function,
    text: string,
    disabled?: boolean,
    fullWidth?: boolean,
    buttonColor?: string,
    leftImage?: number,
    loading?: boolean,
    onePress?: boolean
}

const MainButton = (props: Props) => {
    const [pressed, setPressed] = useState(false)
    const { onPress, text, disabled, fullWidth, buttonColor, leftImage, loading, onePress } = props

    const onPressWithState = () => {
        onePress && setPressed(true)
        onPress()
    }

    if (loading || pressed) {
        return <Spinner size={30} color={Colors.Blue3} type="Circle" />
    }

    const color = buttonColor ? buttonColor : 'Blue2'
    return (
        <Touchable
            {...{ onPress: onPressWithState, disabled }}
            style={[fullWidth && styles.fullWidth]}
        >
            <V
                bg={disabled ? 'Gray4' : color}
                style={[styles.mainButton, fullWidth && styles.fullWidth]}
                p={2}
                br={4}
            >
                {leftImage && (
                    <V pabs style={styles.leftIconContainer} jc="center">
                        <Image source={leftImage} style={styles.leftIcon} />
                    </V>
                )}
                <T button ta="center" color="WhiteM" p={1}>
                    {text}
                </T>
            </V>
        </Touchable>
    )
}

const styles = StyleSheet.create({
    mainButton: {
        width: Metrics.screenWidth - 4 * Metrics.padding.xxLarge,
        ...AppStyles.dropShadow.normal
    },
    fullWidth: {
        width: '100%'
    },
    leftIconContainer: {
        top: 0,
        bottom: 0,
        left: 20
    },
    leftIcon: {
        width: 20,
        resizeMode: 'contain',
        tintColor: Colors.WhiteM
    }
})

export default MainButton
