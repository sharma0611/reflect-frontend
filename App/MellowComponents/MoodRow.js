import React from 'react'
import { StyleSheet } from 'react-native'
import { Colors } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import Touchable from 'Components/Touchable'
import { withNavigation } from 'react-navigation'
import Entry from 'Firebase/models/Entry'
import moment from 'moment'

const DAYS = [
    { day: 0, dayString: 'S' },
    { day: 1, dayString: 'M' },
    { day: 2, dayString: 'T' },
    { day: 3, dayString: 'W' },
    { day: 4, dayString: 'T' },
    { day: 5, dayString: 'F' },
    { day: 6, dayString: 'S' }
]

const MoodColumn = ({ day, emoji, onPress, bold, disabled }) => {
    let Component = V

    if (onPress && !disabled) {
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

const MoodRow = ({ moodData, navigation, disabled }) => {
    return (
        <V row jc="space-between">
            {DAYS.map(({ day, dayString }) => {
                const currMood = moodData.find(({ day: dayNumber }) => dayNumber === day)
                let emoji = ' '
                let onPress
                let bold
                if (currMood) {
                    const { emoji, id } = currMood
                    onPress = async () => {
                        const entry = await Entry.dataFromId(id)
                        navigation.navigate('Entry', {
                            entry
                        })
                    }
                    return (
                        <MoodColumn
                            {...{ day: dayString, emoji, onPress, bold, disabled }}
                            key={day}
                        />
                    )
                }
                const date = moment()
                    .day(day)
                    .toDate()
                const entry = Entry.emptyMood(date)
                onPress = () => {
                    navigation.navigate('Entry', {
                        entry
                    })
                }
                return (
                    <MoodColumn {...{ day: dayString, emoji, onPress, bold, disabled }} key={day} />
                )
            })}
        </V>
    )
}

export default withNavigation(MoodRow)
