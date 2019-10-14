// @flow
import * as React from 'react'
import { Metrics } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import Card from 'Components/Card'

export const CATEGORY_CARD_WIDTH = Metrics.screenWidth * 0.55
export const CATEGORY_CARD_HEIGHT = Metrics.screenHeight * 0.3

const GoalCard = ({ goal, color, date, ...rest }) => {
    const { title } = goal
    return (
        <Card
            bg={color}
            px={2}
            py={2}
            my={1}
            {...rest}
            width={CATEGORY_CARD_WIDTH}
            height={CATEGORY_CARD_HEIGHT}
        >
            <V flex={1} pr={1} pb={1} jc="flex-start">
                <T color="WhiteM" heading thinTitle>
                    {title}
                </T>
            </V>
        </Card>
    )
}

export default GoalCard
