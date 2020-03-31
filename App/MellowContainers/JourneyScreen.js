// @flow
import React, { useState } from 'react'
import V from 'Components/V'
import T from 'Components/T'
import Touchable from 'Components/Touchable'
import Section from 'MellowComponents/Section'
import SectionHeader from 'MellowComponents/SectionHeader'
import WaveBackground from 'MellowComponents/WaveBackground'
import DailyMoodCard from 'MellowModules/DailyMoodCard'
import WeeklyMoodCard from 'MellowModules/WeeklyMoodCard'
import MonthlyMoodCard from 'MellowModules/MonthlyMoodCard'
import MyJournals from 'MellowModules/MyJournals'
import { Metrics } from 'Themes'
import { NavigationEvents } from 'react-navigation'
import useJourneyScreenData from 'Hooks/useJourneyScreenData'
import Loading from 'MellowComponents/Loading'
import ErrorScreen from 'MellowContainers/ErrorScreen'
import withPinProtection from 'HOC/withPinProtection'

// mood filters
const DAILY = 0
const WEEKLY = 1
const MONTHLY = 2

const Pill = ({ active, text, onPress }) => (
    <Touchable onPress={onPress}>
        <V bg={active ? 'Blue3' : 'Gray5'} p={1} px={2} br={3} jc="center" ml={1}>
            <T color="WhiteM" caption>
                {text}
            </T>
        </V>
    </Touchable>
)

const JourneyScreen = () => {
    const {
        loading,
        error,
        clear,
        loadMore,
        hasMore,
        activityResponses,
        weekMoods
    } = useJourneyScreenData()
    const [filter, setFilter] = useState(DAILY)
    if (loading) return <Loading />
    if (error) return <ErrorScreen {...{ error }} />

    const renderMoodCard = currFilter => {
        switch (currFilter) {
            case DAILY:
                return <DailyMoodCard {...{ moods: weekMoods }} />
            case WEEKLY:
                return <WeeklyMoodCard />
            case MONTHLY:
                return <MonthlyMoodCard />
        }
    }

    const Filters = () => {
        return (
            <V row>
                <Pill
                    {...{ text: 'week', active: filter === DAILY, onPress: () => setFilter(DAILY) }}
                />
                <Pill
                    {...{
                        text: 'month',
                        active: filter === WEEKLY,
                        onPress: () => setFilter(WEEKLY)
                    }}
                />
                <Pill
                    {...{
                        text: 'year',
                        active: filter === MONTHLY,
                        onPress: () => setFilter(MONTHLY)
                    }}
                />
            </V>
        )
    }

    const renderHeader = () => {
        return (
            <V style={{ marginTop: Metrics.statusBarHeight }}>
                <Section>
                    <T heading3 color="Gray2">
                        My Journey
                    </T>
                    <SectionHeader {...{ header: 'My mood', RightComponent: Filters }} />
                    <V pt={3}>{renderMoodCard(filter)}</V>
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
            <NavigationEvents
                onWillFocus={() => {
                    clear()
                }}
            />
            <MyJournals {...{ renderHeader, activityResponses, hasMore, loadMore }} />
        </WaveBackground>
    )
}

JourneyScreen.navigationOptions = {
    header: null
}

export default withPinProtection(JourneyScreen)
