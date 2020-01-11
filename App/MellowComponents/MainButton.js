// @flow
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { AppStyles, Metrics } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import Touchable from 'Components/Touchable'

type Props = {}

type State = {}

class MainButton extends React.Component<Props, State> {
    render() {
        const { onPress, text } = this.props
        return (
            <Touchable onPress={onPress}>
                <V bg="Blue2" style={styles.mainButton} p={2} br={4}>
                    <T button ta="center" color="WhiteM">
                        {text}
                    </T>
                </V>
            </Touchable>
        )
    }
}

const styles = StyleSheet.create({
    mainButton: {
        width: Metrics.screenWidth - 2 * Metrics.padding.xxxLarge,
        ...AppStyles.dropShadow.normal
    }
})

export default MainButton
