// @flow
import React from 'react'
import V from 'Components/V'
import T from 'Components/T'
import Section from 'MellowComponents/Section'
import ScrollingScreen from 'MellowComponents/ScrollingScreen'
import LeftChevron from 'MellowComponents/LeftChevron'
import MoodCalendarCard from 'MellowComponents/MoodCalendarCard'

const MoodCalendarScreen = () => {
    return (
        <ScrollingScreen>
            <V p={4}>
                <LeftChevron />
            </V>
            <Section>
                <T heading3 color="Gray2">
                    Mood Calendar
                </T>
                <V pt={3}>
                    <MoodCalendarCard />
                </V>
            </Section>
        </ScrollingScreen>
    )
}

MoodCalendarScreen.navigationOptions = {
    header: null
}

export default MoodCalendarScreen
