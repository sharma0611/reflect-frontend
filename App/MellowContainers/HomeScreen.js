// @flow
import React from 'react'
import { ScrollView, StyleSheet, Image } from 'react-native'
import V from 'Components/V'
import T from 'Components/T'
import WaveBackground from 'MellowComponents/WaveBackground'
import DailyReflectionCard from 'MellowModules/DailyReflectionCard'
import ActivityScroller from '../MellowModules/ActivityScroller'
import CategoryScoller from '../MellowModules/CategoryScroller'

const WaveHeightRatio = 0.3

const Header = ({ header, subtitle }) => {
    return (
        <V pt={3}>
            <T heading4 color="Gray2">
                {header}
            </T>
            <V pt={2}>
                <T subtitle2 color="Gray2">
                    {subtitle}
                </T>
            </V>
        </V>
    )
}

const Section = ({ children, ...rest }) => (
    <V pl={4} pr={4} pt={3} {...rest}>
        {children}
    </V>
)

const HomeScreen = () => {
    return (
        <ScrollView bounces={false}>
            <WaveBackground heightRatio={WaveHeightRatio}>
                <Section>
                    <T heading3 color="Gray2">
                        Hi Shivam!
                    </T>
                    <Header
                        {...{ header: 'Today', subtitle: 'Hit pause. Reflect on what happened.' }}
                    />
                    <V p={2} pt={3}>
                        <DailyReflectionCard />
                    </V>
                </Section>
                <Section>
                    <Header
                        {...{ header: 'On my mind', subtitle: 'Activities to unload my thoughts.' }}
                    />
                </Section>
                <ActivityScroller />
                <Section>
                    <Header
                        {...{
                            header: 'Ask me anything',
                            subtitle: 'A single thought-provoking question.'
                        }}
                    />
                </Section>
                <CategoryScoller />
            </WaveBackground>
        </ScrollView>
    )
}

HomeScreen.navigationOptions = {
    header: null
}

export default HomeScreen
