// @flow
import React from 'react'
import V from 'Components/V'
import T from 'Components/T'
import Section from 'MellowComponents/Section'
import SectionHeader from 'MellowComponents/SectionHeader'
import ScrollingScreen from 'MellowComponents/ScrollingScreen'
import DailyReflectionCard from 'MellowModules/DailyReflectionCard'
import ActivityScroller from 'MellowModules/ActivityScroller'
import CategoryScoller from 'MellowModules/CategoryScroller'

const HomeScreen = () => {
    return (
        <ScrollingScreen>
            <Section>
                <T heading3 color="Gray2">
                    Hi Shivam!
                </T>
                <SectionHeader
                    {...{ header: 'Today', subtitle: 'Hit pause. Reflect on what happened.' }}
                />
                <V pt={3} p={2}>
                    <DailyReflectionCard />
                </V>
            </Section>
            <Section>
                <SectionHeader
                    {...{ header: 'On my mind', subtitle: 'Activities to unload my thoughts.' }}
                />
            </Section>
            <ActivityScroller />
            <Section>
                <SectionHeader
                    {...{
                        header: 'Ask me anything',
                        subtitle: 'A single thought-provoking question.'
                    }}
                />
            </Section>
            <CategoryScoller />
        </ScrollingScreen>
    )
}

HomeScreen.navigationOptions = {
    header: null
}

export default HomeScreen
