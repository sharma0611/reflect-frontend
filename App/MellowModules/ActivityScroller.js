// @flow
import React from 'react'
import { ScrollView } from 'react-native'
import { Metrics, Colors } from 'Themes'
import V from 'Components/V'
import ActivityCard, { ACTIVITY_CARD_WIDTH, ACTIVITY_CARD_MARGIN } from './ActivityCard'

const SNAP_INTERVAL = ACTIVITY_CARD_WIDTH + ACTIVITY_CARD_MARGIN

const ACTIVITIES = [
    {
        title: 'Change ⚡️',
        color: '#91B0DD',
        subtitle: 'A recurring theme in my life.'
    },
    {
        title: 'Imagine 🌤️️',
        color: '#A1DCCE',
        subtitle: 'My ideal life and my road there.'
    },
    {
        title: 'Appreciate 🙌',
        color: Colors.getColor('TealD'),
        subtitle: 'Someone important in my life.'
    },
    {
        title: 'Prepare 👀',
        color: Colors.getColor('PastelSkyBlue'),
        subtitle: 'For an upcoming conversation.'
    },
    {
        title: 'Reflect ✨',
        color: Colors.getColor('PastelPurplePink'),
        subtitle: 'On an interaction with a person.'
    }
]

const ActivityScroller = () => {
    return (
        <V mt={3} mb={3}>
            <ScrollView
                horizontal
                snapToAlignment="start"
                decelerationRate={0}
                snapToInterval={SNAP_INTERVAL}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginLeft: Metrics.padding.xLarge,
                    paddingRight: Metrics.padding.xLarge,
                    marginBottom: Metrics.padding.large
                }}
            >
                {ACTIVITIES.map(({ title, color, subtitle }) => (
                    <ActivityCard {...{ title, color, subtitle }} key={title} />
                ))}
            </ScrollView>
        </V>
    )
}

export default ActivityScroller
