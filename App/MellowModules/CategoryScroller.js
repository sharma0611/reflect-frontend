// @flow
import React from 'react'
import { ScrollView } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Metrics, Colors } from 'Themes'
import V from 'Components/V'
import CategoryCard, { CATEGORY_CARD_WIDTH, CATEGORY_CARD_MARGIN } from './CategoryCard'

const SNAP_INTERVAL = CATEGORY_CARD_WIDTH + CATEGORY_CARD_MARGIN

const getQuestion = categoryId => {
    // make this a call to an API to get a question for a given category
    return {
        header: 'Appreciate 🙌',
        questionText: 'What do I wish was different in my life?',
        caption: 'This is a part of my circle of concern; the things I’m worried about.'
    }
}

const CategoryScoller = ({ navigation, categories }) => {
    const navigateToQuestion = (categoryId, color) => {
        const question = getQuestion(categoryId)
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
                {categories.map(({ id, name, color }) => (
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
