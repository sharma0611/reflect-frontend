// @flow
import React from 'react'
import { ScrollView } from 'react-native'
import { Metrics } from 'Themes'
import V from 'Components/V'
import GoalCategoryCard, { CATEGORY_CARD_WIDTH } from './GoalCategoryCard'
import Prompts from 'Data/prompts'
import { withNavigation } from 'react-navigation'

const CATEGORY_MARGIN = 2
const SNAP_INTERVAL = CATEGORY_CARD_WIDTH + Metrics.padding.scale[CATEGORY_MARGIN]

class JournalCategories extends React.Component<*> {
    renderCategory = (category, index) => {
        return (
            <V mr={CATEGORY_MARGIN} key={category.title}>
                <GoalCategoryCard {...{ category }} />
            </V>
        )
    }

    render() {
        const categories = Prompts.getAllGoalCategories()
        return (
            <ScrollView
                horizontal
                snapToAlignment="start"
                decelerationRate={0}
                snapToInterval={SNAP_INTERVAL}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginLeft: Metrics.padding.medium,
                    paddingRight: Metrics.padding.medium,
                    marginBottom: Metrics.padding.small
                }}
            >
                {categories.map(this.renderCategory)}
            </ScrollView>
        )
    }
}

export default withNavigation(JournalCategories)
