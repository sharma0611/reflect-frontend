// @flow
import React from 'react'
import { Image } from 'react-native'
import { Images, Colors } from 'Themes'
import V from 'Components/V'
import T from 'Components/T'
import Card from 'MellowComponents/Card'
import Touchable from 'Components/Touchable'
import MoodRow from 'MellowComponents/MoodRow'
import { withNavigation } from 'react-navigation'

const DailyMoodCard = ({ moods, navigation }) => {
    const navigateToMoodCalendar = () => {
        navigation.navigate('MoodCalendar')
    }
    return (
        <Card bg="WhiteM" style={{ width: '100%' }}>
            <Image
                source={Images.cardWaveF}
                style={{
                    width: '100%',
                    tintColor: Colors.PastelPurple
                }}
            />
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
        </Card>
    )
}

export default withNavigation(DailyMoodCard)
