// @flow
import React from 'react'
import V from 'Components/V'
import T from 'Components/T'
import MoodRow from 'MellowComponents/MoodRow'
import WaveCard from 'MellowComponents/WaveCard'
import Touchable from 'Components/Touchable'
import { withNavigation } from 'react-navigation'

const MonthlyMoodCard = ({ moods, navigation }) => {
    const navigateToMoodCalendar = () => {
        navigation.navigate('MoodCalendar')
    }
    return (
        <WaveCard>
            <V p={2} pt={3}>
                <MoodRow moodData={moods} />
            </V>
            <Touchable onPress={navigateToMoodCalendar}>
                <V pl={4} pr={4} pb={3} bg="WhiteM">
                    <T ta="right" b1 color="Blue2">
                        See all >
                    </T>
                </V>
            </Touchable>
        </WaveCard>
    )
}

export default withNavigation(MonthlyMoodCard)
