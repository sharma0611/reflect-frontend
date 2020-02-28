// @flow
import React from 'react'
import { ScrollView } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Metrics, Colors } from 'Themes'
import V from 'Components/V'
import CategoryCard, { CATEGORY_CARD_WIDTH, CATEGORY_CARD_MARGIN } from './CategoryCard'

const SNAP_INTERVAL = CATEGORY_CARD_WIDTH + CATEGORY_CARD_MARGIN

const CATEGORIES = [
    {
        id: 'Productivity',
        name: 'Productivity 🤯',
        color: Colors.getColor('PastelRed')
    },
    {
        id: 'Mindfulness',
        name: 'Mindfulness 🌊',
        color: Colors.getColor('PastelOrangeL')
    },
    {
        id: 'Mental',
        name: 'Mental 🧠',
        color: Colors.getColor('TealM')
    },
    {
        id: 'Physical',
        name: 'Physical 💪',
        color: '#A8E7C1'
    },
    {
        id: 'Social',
        name: 'Social 💃',
        color: Colors.getColor('PastelPurplePink')
    }
]

const getQuestion = categoryId => {
    // make this a call to an API to get a question for a given category
    return {
        header: 'Appreciate 🙌',
        title: '1/3',
        subtitle: 'What do I wish was different in my life?',
        caption: 'This is a part of my circle of concern; the things I’m worried about.'
    }
}

const CategoryScoller = ({ navigation }) => {
    const navigateToQuestion = (categoryId, color) => {
        const question = getQuestion()
        navigation.navigate({
            routeName: 'MultiQuestion',
            params: {
                questions: [question],
                color,
                index: 0
            },
            key: 0
        })
    }

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
            <V mt={3} mb={3} row>
                {CATEGORIES.map(({ id, name, color }) => (
                    <CategoryCard
                        {...{ name, color }}
                        key={name}
                        onPress={() => navigateToQuestion(id, color)}
                    />
                ))}
            </V>
        </ScrollView>
    )
}

export default withNavigation(CategoryScoller)
