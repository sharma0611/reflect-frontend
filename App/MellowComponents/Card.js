// @flow
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { AppStyles } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'

type Props = {}

type State = {}

class Card extends React.Component<Props, State> {
    render() {
        const { children, style, ...rest } = this.props
        return (
            <V {...rest} style={{ ...styles.card, ...style }}>
                {children}
            </V>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 30,
        ...AppStyles.dropShadow.big
    }
})

export default Card
