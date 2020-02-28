// @flow
import React from 'react'
import V from 'Components/V'
import T from 'Components/T'
import Section from 'MellowComponents/Section'
import SectionHeader from 'MellowComponents/SectionHeader'
import ScrollingScreen from 'MellowComponents/ScrollingScreen'
import DailyMoodCard from 'MellowModules/DailyMoodCard'
import MyJournals from 'MellowModules/MyJournals'

const JourneyScreen = () => {
    return (
        <ScrollingScreen>
            <Section>
                <T heading3 color="Gray2">
                    My Journey
                </T>
                {/* <SectionHeader {...{ header: 'Progress check' }} /> */}
                <SectionHeader {...{ header: 'My mood' }} />
                <V pt={3}>
                    <DailyMoodCard />
                </V>
            </Section>
            <Section>
                <SectionHeader {...{ header: 'My journals' }} />
            </Section>
            <MyJournals />
        </ScrollingScreen>
    )
}

JourneyScreen.navigationOptions = {
    header: null
}

export default JourneyScreen
