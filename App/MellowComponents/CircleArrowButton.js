// @flow
import React from 'react'
import RightChevron from 'MellowComponents/RightChevron'
import Touchable from 'Components/Touchable'
import V from 'Components/V'

const CIRCLE_WIDTH = 60
const CircleArrowButton = ({ onPress, color }) => {
    return (
        <Touchable onPress={onPress}>
            <V jc="flex-end" row pr={4}>
                <V
                    bg={color ? color : 'Blue2'}
                    style={{
                        height: CIRCLE_WIDTH,
                        width: CIRCLE_WIDTH,
                        borderRadius: CIRCLE_WIDTH / 2
                    }}
                    ai="center"
                    jc="center"
                >
                    <RightChevron tintColor="WhiteM" />
                </V>
            </V>
        </Touchable>
    )
}

export default CircleArrowButton
