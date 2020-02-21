// @flow
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { AppStyles } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'

type Props = {}

type State = {}

// to use flex inside the card you need to specify height!
class Card extends React.Component<Props, State> {
    render() {
        const { children, style, flexbox, ...rest } = this.props
        return (
            <V {...rest} style={{ ...styles.card, ...style }}>
                <V style={[styles.innerCard, flexbox && styles.innerFlexBox]}>{children}</V>
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
    },
    innerCard: {
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 30,
        overflow: 'hidden'
    },
    innerFlexBox: {
        flex: 1,
        display: 'flex'
    }
})

export default Card
