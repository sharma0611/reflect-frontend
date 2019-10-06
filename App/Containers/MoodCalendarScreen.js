// @flow
import React, { useState, useEffect } from 'react'

// Components
import { StyleSheet, SectionList } from 'react-native'
import T from 'Components/T'
import V from 'Components/V'
import Screen from 'Components/Screen'
import Section from 'Components/Section'
import { Metrics, AppStyles, Fonts, Colors } from 'Themes'

// Helpers
import { withNavigation, NavigationEvents } from 'react-navigation'
import ScreenHeader from 'Components/ScreenHeader'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import MongoController from '../Controllers/MongoController'
import moment from 'moment'
import Touchable from 'Components/Touchable'

LocaleConfig.locales['en'] = {
    monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    monthNamesShort: [
        'Janv.',
        'Févr.',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juil.',
        'Août',
        'Sept.',
        'Oct.',
        'Nov.',
        'Déc.'
    ],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    today: 'Today'
}
LocaleConfig.defaultLocale = 'en'

type Props = {}

type State = {}

const DayComponent = ({ date, state, navigation }) => {
    const [emoji, setEmoji] = useState('')
    const dt = moment(date.dateString, 'YYYY-MM-DD').toDate()
    const onDayPress = () => {
        navigation.navigate('JournalReview', { date: dt, dateString: date.dateString })
    }

    const getData = async () => {
        const mood = await MongoController.getDailyMood(dt)
        if (mood) {
            await setEmoji(mood.emoji)
        } else {
            await setEmoji('')
        }
    }

    useEffect(() => {
        getData()
    })

    return (
        <Touchable onPress={onDayPress}>
            <V
                key={date.dateString}
                ai="center"
                jc="center"
                style={{ width: Fonts.size.titleXL + 5, height: Fonts.size.titleXL + 8 }}
            >
                <NavigationEvents
                    onWillFocus={async () => {
                        await getData()
                    }}
                />
                <V pabs style={{ left: 0, top: 0 }}>
                    <T baby color="GreyM">
                        {date.day}
                    </T>
                </V>
                <T titleM>{emoji}</T>
            </V>
        </Touchable>
    )
}

class MoodCalendarScreen extends React.Component<Props, State> {
    state = {
        loading: true
    }
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    }

    render() {
        const { navigation } = this.props
        return (
            <Screen pb={0}>
                <ScreenHeader titleLeft={'Mood'} titleRight={' Calendar'} />
                <V pt={2}>
                    <Calendar
                        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                        maxDate={new Date()}
                        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                        monthFormat={'MMMM yyyy'}
                        // Do not show days of other months in month page. Default = false
                        hideExtraDays={true}
                        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                        // day from another month that is visible in calendar page. Default = false
                        disableMonthChange={true}
                        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                        firstDay={0}
                        // Hide day names. Default = false
                        hideDayNames={false}
                        theme={{
                            backgroundColor: '#ffffff',
                            calendarBackground: '#ffffff',
                            textSectionTitleColor: Colors.GreyM,
                            // selectedDayBackgroundColor: '#00adf5',
                            // selectedDayTextColor: '#ffffff',
                            // todayTextColor: '#00adf5',
                            dayTextColor: Colors.GreyM,
                            // textDisabledColor: '#d9e1e8',
                            // dotColor: '#00adf5',
                            // selectedDotColor: '#ffffff',
                            arrowColor: Colors.GreyM,
                            monthTextColor: Colors.GreyM,
                            // indicatorColor: 'blue',
                            textDayFontFamily: Fonts.type.thinTitle,
                            textMonthFontFamily: Fonts.type.thinTitle,
                            textDayHeaderFontFamily: Fonts.type.thinTitle,
                            textDayFontWeight: '300',
                            textMonthFontWeight: '300',
                            textDayHeaderFontWeight: '300',
                            textDayFontSize: 12,
                            textMonthFontSize: 16,
                            textDayHeaderFontSize: 12
                        }}
                        // // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                        // onPressArrowLeft={substractMonth => substractMonth()}
                        // // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                        // onPressArrowRight={addMonth => addMonth()}
                        dayComponent={({ date, state }) => {
                            return <DayComponent {...{ date, state, navigation }} />
                        }}
                    />
                </V>
            </Screen>
        )
    }
}

const styles = StyleSheet.create({})

export default withNavigation(MoodCalendarScreen)
