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
        const { onPress, text, disabled } = this.props
        return (
            <Touchable {...{ onPress, disabled }}>
                <V bg={disabled ? 'Gray4' : 'Blue2'} style={styles.mainButton} p={2} br={4}>
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
    }
})

export default MainButton
