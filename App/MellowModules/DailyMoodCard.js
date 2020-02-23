// @flow
import React from 'react'
import { Image } from 'react-native'
import { Images, Colors } from 'Themes'
import V from 'Components/V'
import T from 'Components/T'
import Card from 'MellowComponents/Card'
import Touchable from 'Components/Touchable'
import MoodRow from 'MellowComponents/MoodRow'

const MOOD_DATA = [
    { day: 'S', emoji: '🤣' },
    { day: 'M', emoji: '‍️🤓' },
    { day: 'T', emoji: '😛' },
    { day: 'W', emoji: '' },
    { day: 'T', emoji: '' },
    { day: 'F', emoji: '' },
    { day: 'S', emoji: '' }
]

const DailyMoodCard = () => {
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
                <MoodRow moodData={MOOD_DATA} />
            </V>
            <Touchable>
                <V pl={4} pr={4} pb={3} bg="WhiteM">
                    <T ta="right" b1 color="Blue2">
                        See all >
                    </T>
                </V>
            </Touchable>
        </Card>
    )
}

export default DailyMoodCard
