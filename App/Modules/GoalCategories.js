// @flow
import React from 'react'
import { ScrollView, Animated } from 'react-native'
import { Metrics } from 'Themes'
import V from 'Components/V'
import GoalCategoryCard, { CATEGORY_CARD_WIDTH } from './GoalCategoryCard'
import Prompts from 'Data/prompts'
import { withNavigation } from 'react-navigation'

const CATEGORY_MARGIN = 2
const SNAP_INTERVAL = CATEGORY_CARD_WIDTH + Metrics.padding.scale[CATEGORY_MARGIN]

class GoalCategories extends React.Component<*> {
    renderCategory = (category, index) => {
        return (
            <V mr={CATEGORY_MARGIN} key={category.title}>
                <GoalCategoryCard {...{ category, date: this.props.date }} />
            </V>
        )
    }

    handleScroll = event => {
        let index = event.nativeEvent.contentOffset.x / (SNAP_INTERVAL - Metrics.padding.medium)
        if (index < 0) {
            index = 0
        }
        this.props.setHeaderColor(index)
    }

    render() {
        const categories = Prompts.getAllGoalCategories()
        return (
            <ScrollView
                horizontal
                snapToAlignment="start"
                decelerationRate={0}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: { contentOffset: { x: this.props.HeaderColor } }
                        }
                    ],
                    { listener: this.handleScroll }, //Added listener
                    {
                        useNativeDriver: true
                    }
                )}
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
