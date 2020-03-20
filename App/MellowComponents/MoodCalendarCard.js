// @flow
import React, { useState, useEffect } from 'react'
import { Fonts, Colors } from 'Themes'
import V from 'Components/V'
import T from 'Components/T'
import Touchable from 'Components/Touchable'
import MongoController from 'Controllers/MongoController'
import { getEmptyMoodEntry } from 'Controllers/FirebaseController'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import moment from 'moment'
import { withNavigation } from 'react-navigation'
import useMoods from 'Hooks/useMoods'
import Card from 'MellowComponents/Card'

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

const DayComponent = ({ date, state, navigation }) => {
    const dt = moment(date.dateString, 'YYYY-MM-DD').toDate()
    const [legacyEmoji, setLegacyEmoji] = useState('')
    const { loading, error, moods } = useMoods({
        startDate: dt,
        endDate: dt
    })

    const onDayPress = () => {
        let entry
        if (moods.length > 0) {
            entry = moods[0]
        } else {
            entry = getEmptyMoodEntry(dt)
        }
        if (!legacyEmoji) {
            navigation.navigate('Entry', {
                entry
            })
        }
    }

    const getData = async () => {
        const mood = await MongoController.getDailyMood(dt)
        if (mood) {
            await setLegacyEmoji(mood.emoji)
        } else {
            await setLegacyEmoji('')
        }
    }

    useEffect(() => {
        getData()
    }, [])

    let displayEmoji = legacyEmoji
    if (moods.length > 0) {
        const entry = moods[0]
        displayEmoji = entry.responseText
    }

    return (
        <Touchable onPress={onDayPress}>
            <V
                key={date.dateString}
                ai="center"
                jc="center"
                style={{ width: Fonts.size.titleXL + 5, height: Fonts.size.titleXL + 8 }}
            >
                <V pabs style={{ left: 0, top: 0 }}>
                    <T baby color="GreyM">
                        {date.day}
                    </T>
                </V>
                <T titleM>{displayEmoji}</T>
            </V>
        </Touchable>
    )
}

const MoodCalendar = ({ navigation }) => {
    return (
        <Card alt bg="WhiteM">
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
                    backgroundColor: 'transparent',
                    calendarBackground: 'transparent',
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
                    return <DayComponent {...{ date, state, navigation }} key={date.dateString} />
                }}
            />
        </Card>
    )
}

export default withNavigation(MoodCalendar)
