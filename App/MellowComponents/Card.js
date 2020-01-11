// @flow
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { AppStyles } from 'Themes'
import T from 'Components/FmzText'
import V from 'Components/V'

type Props = {}

type State = {}

class Card extends React.Component<Props, State> {
    render() {
        const { children, style, ...rest } = this.props
        return (
            <V {...rest} style={{ ...styles.card, ...style }} br={3}>
                {children}
            </V>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        ...AppStyles.dropShadow.normal
    }
})

export default Card
