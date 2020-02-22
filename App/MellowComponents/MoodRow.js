import React from 'react'
import { StyleSheet } from 'react-native'
import { Colors } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import Touchable from 'Components/Touchable'

const MoodColumn = ({ day, emoji, onPress, bold }) => {
    let Component = V

    if (onPress) {
        Component = Touchable
    }

    let style = { alignItems: 'center', flex: 1 }

    if (bold) {
        style = {
            ...style,
            borderLeftColor: Colors.WhiteM,
            borderLeftWidth: StyleSheet.hairlineWidth,
            borderRightColor: Colors.WhiteM,
            borderRightWidth: StyleSheet.hairlineWidth
        }
    }

    return (
        <Component style={style} onPress={onPress}>
            <V ai="center">
                <T color="Gray1">{day}</T>
                <T color="WhiteM" titleM pt={1}>
                    {emoji ? emoji : ''}
                </T>
            </V>
        </Component>
    )
}

const MoodRow = ({ moodData }) => {
    return (
        <V row jc="space-between">
            {moodData.map(({ day, emoji, onPress, bold }, index) => (
                <MoodColumn {...{ day, emoji, onPress, bold }} key={index} />
            ))}
        </V>
    )
}

export default MoodRow
