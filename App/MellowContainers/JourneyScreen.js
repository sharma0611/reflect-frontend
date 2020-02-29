// @flow
import React from 'react'
import V from 'Components/V'
import T from 'Components/T'
import Section from 'MellowComponents/Section'
import SectionHeader from 'MellowComponents/SectionHeader'
import WaveBackground from 'MellowComponents/WaveBackground'
import DailyMoodCard from 'MellowModules/DailyMoodCard'
import MyJournals from 'MellowModules/MyJournals'
import { Metrics } from 'Themes'

const JourneyScreen = () => {
    const renderHeader = () => {
        return (
            <V style={{ marginTop: Metrics.statusBarHeight }}>
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
            </V>
        )
    }
    // we render the header inside the Journals screen since we do not want to nest a
    // virtualized list inside of a scrollview. Otherwise we would use scrollingscreen here
    return (
        <WaveBackground heightRatio={0.3} fullScreen>
            <MyJournals {...{ renderHeader }} />
        </WaveBackground>
    )
}

JourneyScreen.navigationOptions = {
    header: null
}

export default JourneyScreen
