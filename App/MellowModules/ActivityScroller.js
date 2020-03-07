// @flow
import React from 'react'
import { ScrollView } from 'react-native'
import { Metrics } from 'Themes'
import V from 'Components/V'
import ActivityCard, { ACTIVITY_CARD_WIDTH, ACTIVITY_CARD_MARGIN } from './ActivityCard'

const SNAP_INTERVAL = ACTIVITY_CARD_WIDTH + ACTIVITY_CARD_MARGIN

const ActivityScroller = ({ activities }) => {
    return (
        <ScrollView
            horizontal
            snapToAlignment="start"
            decelerationRate={0}
            snapToInterval={SNAP_INTERVAL}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                marginLeft: Metrics.padding.xLarge,
                paddingRight: Metrics.padding.xLarge
            }}
        >
            <V mt={3} row>
                {activities.map(activity => (
                    <ActivityCard {...{ activity }} key={activity.title} />
                ))}
            </V>
        </ScrollView>
    )
}

export default ActivityScroller
