// @flow
import * as React from 'react'
import { Metrics } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import Card from 'Components/Card'

export const CATEGORY_CARD_WIDTH = Metrics.screenWidth * 0.65
export const CATEGORY_CARD_HEIGHT = Metrics.screenHeight * 0.4

const GoalCard = ({ goal, color, date, ...rest }) => {
    return (
        <Card
            bg={color}
            p={4}
            my={1}
            {...rest}
            width={CATEGORY_CARD_WIDTH}
            height={CATEGORY_CARD_HEIGHT}
        >
            <V flex={1} pr={1} pb={1} jc="flex-start">
                <T color="WhiteM" titleL thinTitle>
                    {goal}
                </T>
            </V>
        </Card>
    )
}

export default GoalCard
