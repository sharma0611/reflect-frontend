// @flow
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { AppStyles, Metrics } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import Touchable from 'Components/Touchable'

type Props = {}

type State = {}

class SecondaryButton extends React.Component<Props, State> {
    render() {
        const { onPress, text } = this.props
        return (
            <Touchable onPress={onPress}>
                <V style={styles.secondaryButton} p={2}>
                    <T button ta="center" color="Gray2">
                        {text}
                    </T>
                </V>
            </Touchable>
        )
    }
}

const styles = StyleSheet.create({
    secondaryButton: {
        width: Metrics.screenWidth - 2 * Metrics.padding.xxxLarge
    }
})

export default SecondaryButton
