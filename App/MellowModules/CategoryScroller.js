// @flow
import React from 'react'
import { ScrollView } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Metrics } from 'Themes'
import V from 'Components/V'
import CategoryCard, { CATEGORY_CARD_WIDTH, CATEGORY_CARD_MARGIN } from './CategoryCard'
import Question from 'Firebase/models/Question'
import useUser from '../Hooks/useUser'

const SNAP_INTERVAL = CATEGORY_CARD_WIDTH + CATEGORY_CARD_MARGIN

const getQuestion = async (categoryId, categoryName) => {
    const question = await Question.getRandomQuestion(categoryId)
    return {
        ...question,
        header: categoryName
    }
}

const CategoryScoller = ({ navigation, categories }) => {
    const { hasPro } = useUser()
    const navigateToQuestion = async (categoryId, categoryName, color, isPro) => {
        if (hasPro || !isPro) {
            const { id: questionId, ...rest } = await getQuestion(categoryId, categoryName)
            const activity = {
                color,
                activityType: categoryId,
                name: categoryName,
                entries: [{ ...rest, questionId }]
            }
            navigation.navigate({
                routeName: 'Activity',
                params: {
                    activity,
                    color,
                    index: 0
                },
                key: 0
            })
        } else {
            navigation.navigate('MellowPaywall')
        }
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
                {categories.map(({ id, name, isPro, color }) => (
                    <CategoryCard
                        {...{ name, color, locked: isPro && !hasPro }}
                        key={name}
                        onPress={() => navigateToQuestion(id, name, color, isPro)}
                    />
                ))}
            </V>
        </ScrollView>
    )
}

export default withNavigation(CategoryScoller)
