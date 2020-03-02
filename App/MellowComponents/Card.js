// @flow
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { AppStyles } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'

// to use flex inside the card you need to specify height!
const Card = ({ children, style, flexbox, alt, ...rest }) => {
    const cardStyle = alt ? styles.altCard : styles.card
    const innerCardStyle = alt ? styles.innerAltCard : styles.innerCard
    return (
        <V {...rest} style={[cardStyle, style]}>
            <V style={[innerCardStyle, flexbox && styles.innerFlexBox]}>{children}</V>
        </V>
    )
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
    altCard: {
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        ...AppStyles.dropShadow.big
    },
    innerAltCard: {
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        overflow: 'hidden'
    },
    innerFlexBox: {
        flex: 1,
        display: 'flex'
    }
})

export default Card
