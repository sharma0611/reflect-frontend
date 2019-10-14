// @flow
import * as React from 'react'
import { Metrics, Colors } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import TouchableCard from 'Components/TouchableCard'
import { withNavigation } from 'react-navigation'

export const CATEGORY_CARD_WIDTH = Metrics.screenWidth * 0.42
export const CATEGORY_CARD_HEIGHT = Metrics.screenHeight * 0.24

const GoalCategoryCard = ({ category, ...rest }) => {
    const { title, subtitle, color } = category
    const { navigation } = rest
    const onPress = () => navigation.navigate('Paywall')
    return (
        <TouchableCard
            bg={color}
            px={2}
            py={2}
            my={1}
            gradient
            onPress={onPress}
            {...rest}
            width={CATEGORY_CARD_WIDTH}
            height={CATEGORY_CARD_HEIGHT}
        >
            <V flex={1} pr={1} pb={1} jc="space-between">
                <T color="WhiteM" heading thinTitle>
                    {title}
                </T>
                <T color="WhiteM" thinTitle>
                    {subtitle}
                </T>
            </V>
        </TouchableCard>
    )
}

export default withNavigation(GoalCategoryCard)
