// @flow
import React from 'react'
import { StyleSheet } from 'react-native'
import { Colors } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import Card from 'Components/Card'
import { withNavigation, NavigationEvents } from 'react-navigation'
import MongoController from 'Controllers/MongoController'
import moment from 'moment'
import Touchable from 'Components/Touchable'

type Props = {}

type State = {
    loaded: boolean,
    copy?: string
}

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const FULL_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const DayEmojiColumn = ({ day, emoji, onPress, bold }, index) => {
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
        <Component key={index} style={style} onPress={onPress}>
            <V ai="center" flex={1}>
                <T color="WhiteM">{day}</T>
                <T color="WhiteM" titleM pt={1}>
                    {emoji ? emoji : ''}
                </T>
            </V>
        </Component>
    )
}

class MoodCard extends React.Component<Props, State> {
    state = {
        loaded: false
    }

    setEmoji = async (date: Date, emoji: string) => {
        await MongoController.insertDailyMood(date, emoji)
        this.getEmojiCopy()
    }

    componentDidMount() {
        this.getEmojiCopy()
    }

    async getEmojiCopy() {
        const { date: today } = this.props
        let copy = []
        const startOfWeek = moment(today).startOf('week')
        const endOfWeek = moment(today).endOf('week')

        let day = startOfWeek
        let step = 0
        while (day <= endOfWeek) {
            let currDay = day.toDate()
            let dailyMood = await MongoController.getDailyMood(currDay)
            let emoji
            if (dailyMood) {
                emoji = dailyMood.emoji
            } else if (day.isSame(today, 'day')) {
                emoji = '﹖'
            } else {
                emoji = null
            }
            copy.push({ date: day, day: DAYS[step], emoji })
            day = day.clone().add(1, 'd')
            step = step + 1
        }
        this.setState({ copy })
    }

    render() {
        const { setEmoji } = this
        const { date: today } = this.props
        return (
            <Card bg="BlueL" p={1} my={2} pb={2}>
                <NavigationEvents
                    onWillFocus={async () => {
                        await this.getEmojiCopy()
                    }}
                />
                <T color="WhiteM" heading pt={2} pl={2} pb={1}>
                    My mood
                </T>
                <V row jc="space-between" pt={2}>
                    {this.state.copy
                        ? this.state.copy.map(({ date, day, emoji }, index) => {
                              let onPress
                              const bold = date.isSame(today, 'day')
                              const title = bold
                                  ? `Today, I'm feeling like...`
                                  : `${FULL_DAYS[date.toDate().getDay()]}, I was feeling like... `
                              if (date <= today) {
                                  onPress = () =>
                                      this.props.navigation.navigate('Emoji', {
                                          setEmoji: emoji => setEmoji(date.toDate(), emoji),
                                          title
                                      })
                              }
                              return DayEmojiColumn({ day, emoji, onPress, bold }, index)
                          })
                        : null}
                </V>
            </Card>
        )
    }
}

export default withNavigation(MoodCard)
