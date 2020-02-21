// @flow
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { AppStyles, Metrics } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import Touchable from 'Components/Touchable'

type Props = {
    disabled: boolean
}

type State = {}

class MainButton extends React.Component<Props, State> {
    render() {
        const { onPress, text, disabled, fullWidth, buttonColor, LeftIcon } = this.props

        const color = buttonColor ? buttonColor : 'Blue2'
        return (
            <Touchable {...{ onPress, disabled }} style={[fullWidth && styles.fullWidth]}>
                <V
                    bg={disabled ? 'Gray4' : color}
                    style={[styles.mainButton, fullWidth && styles.fullWidth]}
                    p={2}
                    br={4}
                >
                    {LeftIcon && (
                        <V pabs style={{ top: 0, bottom: 0, left: 20 }} jc="center">
                            {LeftIcon}
                        </V>
                    )}
                    <T button ta="center" color="WhiteM" p={1}>
                        {text}
                    </T>
                </V>
            </Touchable>
        )
    }
}

const styles = StyleSheet.create({
    mainButton: {
        width: Metrics.screenWidth - 4 * Metrics.padding.xxLarge,
        ...AppStyles.dropShadow.normal
    },
    fullWidth: {
        width: '100%'
    }
})

export default MainButton
