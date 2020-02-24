// @flow
import React from 'react'
import { ScrollView } from 'react-native'
import { Metrics, Colors } from 'Themes'
import V from 'Components/V'
import ActivityCard, { ACTIVITY_CARD_WIDTH, ACTIVITY_CARD_MARGIN } from './ActivityCard'
import { withNavigation } from 'react-navigation'

const SNAP_INTERVAL = ACTIVITY_CARD_WIDTH + ACTIVITY_CARD_MARGIN

const ACTIVITIES = [
    {
        title: 'Change ⚡️',
        color: '#91B0DD',
        subtitle: 'A recurring theme in my life.',
        questions: [
            {
                title: '1/3',
                subtitle: 'What do I wish was different in my life?',
                caption: 'This is a part of my circle of concern; the things I’m worried about.'
            },
            {
                title: '2/3',
                subtitle: 'What can I do to make this change happen?',
                caption: 'This is a part of my circle of influence; the things I can do. '
            },
            {
                title: '3/3',
                subtitle: 'What will I do today to get to that change?',
                caption: 'If I focus more on my circle of influence, it will expand.'
            }
        ]
    },
    {
        title: 'Imagine 🌤️️',
        color: '#A1DCCE',
        subtitle: 'My ideal life and my road there.',
        questions: [
            {
                title: '1/3',
                subtitle: 'What do I wish was different in my life?',
                caption: 'This is a part of my circle of concern; the things I’m worried about.'
            },
            {
                title: '2/3',
                subtitle: 'What can I do to make this change happen?',
                caption: 'This is a part of my circle of influence; the things I can do. '
            },
            {
                title: '3/3',
                subtitle: 'What will I do today to get to that change?',
                caption: 'If I focus more on my circle of influence, it will expand.'
            }
        ]
    },
    {
        title: 'Appreciate 🙌',
        color: Colors.getColor('TealD'),
        subtitle: 'Someone important in my life.',
        questions: [
            {
                title: '1/3',
                subtitle: 'What do I wish was different in my life?',
                caption: 'This is a part of my circle of concern; the things I’m worried about.'
            },
            {
                title: '2/3',
                subtitle: 'What can I do to make this change happen?',
                caption: 'This is a part of my circle of influence; the things I can do. '
            },
            {
                title: '3/3',
                subtitle: 'What will I do today to get to that change?',
                caption: 'If I focus more on my circle of influence, it will expand.'
            }
        ]
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

const ActivityScroller = ({ navigation }) => {
    return (
        <V mt={3}>
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
                {ACTIVITIES.map(({ title, color, subtitle, questions }) => (
                    <ActivityCard
                        {...{ title, color, subtitle }}
                        key={title}
                        onPress={() =>
                            navigation.navigate({
                                routeName: 'MultiQuestion',
                                params: {
                                    questions,
                                    color,
                                    index: 0,
                                    activityTitle: title
                                },
                                key: 0
                            })
                        }
                    />
                ))}
            </ScrollView>
        </V>
    )
}

export default withNavigation(ActivityScroller)