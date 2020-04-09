//@flow
import React, { useState, useEffect } from 'react'
import { Animated } from 'react-native'
import type AnimatedValue from 'react-native/Libraries/Animated/src/nodes/AnimatedValue'
import V from 'Components/V'
import Touchable from 'Components/Touchable'

type SwitchProps = {
    toggle: boolean,
    onPress: Function
}

type SwitchUIProps = {
    value: AnimatedValue
}

const SwitchUI = ({ value }: SwitchUIProps) => {
    const SWITCH_HEIGHT = 7
    const SWITCH_WIDTH = 35
    const CIRCLE = 15
    return (
        <Animated.View
            style={{
                height: 7,
                width: SWITCH_WIDTH,
                borderRadius: SWITCH_HEIGHT,
                backgroundColor: value.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['rgba(224, 224, 224, 1)', 'rgba(168, 231, 193, 1)']
                }),
                alignItems: 'center',
                flexDirection: 'row'
            }}
        >
            <Animated.View
                pabs
                style={{
                    backgroundColor: value.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['rgba(146, 168, 186, 1)', 'rgba(111, 207, 151, 1)']
                    }),
                    height: CIRCLE,
                    width: CIRCLE,
                    borderRadius: CIRCLE / 2,
                    left: 0,
                    transform: [
                        {
                            translateX: value.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, SWITCH_WIDTH - CIRCLE]
                            })
                        }
                    ]
                }}
            />
        </Animated.View>
    )
}

const Switch = ({ toggle, onPress }: SwitchProps) => {
    const [switchAnimation] = useState(new Animated.Value(+toggle))
    useEffect(() => {
        Animated.timing(switchAnimation, {
            toValue: +toggle,
            duration: 300
        }).start()
    }, [toggle])
    return (
        <Touchable onPress={onPress}>
            <V p={2} px={3}>
                <SwitchUI value={switchAnimation} />
            </V>
        </Touchable>
    )
}

export default Switch
