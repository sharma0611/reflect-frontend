// @flow
import React from 'react'
import V from 'Components/V'
import MoodRow from 'MellowComponents/MoodRow'
import WaveCard from 'MellowComponents/WaveCard'

const MOOD_DATA = [
    { day: 'S', emoji: '🤣' },
    { day: 'M', emoji: '‍️🤓' },
    { day: 'T', emoji: '😛' },
    { day: 'W', emoji: '' },
    { day: 'T', emoji: '' },
    { day: 'F', emoji: '' },
    { day: 'S', emoji: '' }
]

const DailyMoodCard = ({ moods }) => {
    return (
        <WaveCard>
            <V p={2} pt={3}>
                <MoodRow moodData={moods} />
            </V>
            {/* <Touchable>
                <V pl={4} pr={4} pb={3} bg="WhiteM">
                    <T ta="right" b1 color="Blue2">
                        See all >
                    </T>
                </V>
            </Touchable> */}
        </WaveCard>
    )
}

export default DailyMoodCard
