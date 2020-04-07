// @flow
import React, { useState, useEffect } from 'react'
import { Image } from 'react-native'
import { Images } from 'Themes'
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
import DailyReflectionCompletedCard from 'MellowModules/DailyReflectionCompletedCard'
import { withNavigation } from 'react-navigation'
import Touchable from 'Components/Touchable'

const CustomizeReflection = ({ navigation }) => {
    const navigateToCustomize = () => {
        navigation.navigate('EditDailyReflection')
    }

    return (
        <Touchable onPress={navigateToCustomize}>
            <Image source={Images.gear} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
        </Touchable>
    )
}

const HomeScreen = () => {
    const {
        loading,
        error,
        profile,
        categories,
        activities,
        dailyReflection,
        completedDailyReflection,
        streak
    } = useHomeScreenData()
    if (loading) return <Loading />
    if (error) return <ErrorScreen {...{ error }} />
    return (
        <ScrollingScreen>
            <Section>
                <T heading3 color="Gray2">
                    {`Hi ${profile.displayName || ''}!`}
                </T>
                <SectionHeader
                    {...{ header: 'Today', RightComponent: withNavigation(CustomizeReflection) }}
                />
                <V pt={3} p={2}>
                    {completedDailyReflection ? (
                        <DailyReflectionCompletedCard {...{ streak }} />
                    ) : (
                        <DailyReflectionCard {...{ dailyReflection }} />
                    )}
                </V>
            </Section>
            <Section>
                <SectionHeader
                    {...{ header: 'On my mind', subtitle: 'Activities to unload my thoughts.' }}
                />
            </Section>
            <ActivityScroller {...{ activities }} />
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
