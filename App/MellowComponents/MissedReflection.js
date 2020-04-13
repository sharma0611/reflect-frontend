// @flow
import * as React from 'react'
import { withNavigation } from 'react-navigation'
import V from 'Components/V'
import T from 'Components/T'
import Touchable from 'Components/Touchable'

const MissedReflection = ({ navigation }) => {
    return (
        <V jc="flex-end" row>
            <Touchable onPress={() => navigation.navigate('ReflectionCalendar')}>
                <T b1 color="Blue2" py={1} pl={2} pr={0}>
                    Missed one?
                </T>
            </Touchable>
        </V>
    )
}

export default withNavigation(MissedReflection)
