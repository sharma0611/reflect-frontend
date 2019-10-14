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
export const calculateProgress = (scroll: number, height: number) => {
    let progress
    progress = parseFloat(scroll) / parseFloat(height) || 0
    if (progress < 0) {
        progress = 0
    } else if (progress > 1) {
        progress = 1
    }
    return progress
}

class GoalCategories extends React.Component<*> {
    renderCategory = (category, index) => {
        return (
            <V mr={CATEGORY_MARGIN} key={category.title}>
                <GoalCategoryCard {...{ category, date: this.props.date }} />
            </V>
        )
    }

    handleScroll = event => {
        const index = calculateProgress(
            SNAP_INTERVAL - Metrics.padding.medium / 2,
            event.nativeEvent.contentOffset.x
        )
    }

    render() {
        const categories = Prompts.getAllGoalCategories()
        return (
            <ScrollView
                horizontal
                snapToAlignment="start"
                decelerationRate={0}
                onScroll={this.handleScroll}
                scrollEventThrottle={10}
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

export default withNavigation(GoalCategories)
