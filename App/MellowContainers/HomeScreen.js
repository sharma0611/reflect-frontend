// @flow
import React from 'react'
import V from 'Components/V'
import T from 'Components/T'
import Section from 'MellowComponents/Section'
import SectionHeader from 'MellowComponents/SectionHeader'
import ScrollingScreen from 'MellowComponents/ScrollingScreen'
import DailyReflectionCard from 'MellowModules/DailyReflectionCard'
import ActivityScroller from '../MellowModules/ActivityScroller'
import CategoryScoller from '../MellowModules/CategoryScroller'
import useHomeScreenData from '../Hooks/useHomeScreenData'
import Loading from 'MellowComponents/Loading'
import ErrorScreen from 'MellowContainers/ErrorScreen'

const HomeScreen = () => {
    const { loading, error, profile, categories } = useHomeScreenData()
    console.log(`👨‍🌾 => `, categories)
    if (loading) return <Loading />
    if (error) return <ErrorScreen {...{ error }} />
    return (
        <ScrollingScreen>
            <Section>
                <T heading3 color="Gray2">
                    {`Hi ${profile.displayName}!`}
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
            <CategoryScoller {...{ categories }} />
        </ScrollingScreen>
    )
}

HomeScreen.navigationOptions = {
    header: null
}

export default HomeScreen
