// @flow
import React from 'react'
import { ScrollView } from 'react-native'
import V from 'Components/V'
import T from 'Components/T'
import WaveBackground from 'MellowComponents/WaveBackground'
import Section from 'MellowComponents/Section'
import SectionHeader from 'MellowComponents/SectionHeader'
import ScrollingScreen from 'MellowComponents/ScrollingScreen'

const JourneyScreen = () => {
    return (
        <ScrollingScreen>
            <Section>
                <T heading3 color="Gray2">
                    My Journey
                </T>
                {/* <SectionHeader {...{ header: 'Progress check' }} /> */}
                {/* <SectionHeader {...{ header: 'Progress check' }} /> */}
                <SectionHeader {...{ header: 'My mood' }} />
            </Section>
        </ScrollingScreen>
    )
}

JourneyScreen.navigationOptions = {
    header: null
}

export default JourneyScreen
