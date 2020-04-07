// @flow
import React, { useState } from 'react'
import { withNavigation } from 'react-navigation'
import V from 'Components/V'
import T from 'Components/T'
import WaveCard from 'MellowComponents/WaveCard'
import Touchable from 'Components/Touchable'
import moment from 'moment'
import WeeklyMoodGraph from './WeeklyMoodGraph'
import useProfile from 'Hooks/useProfile'

const WeeklyMoodCard = ({ navigation }) => {
    const { hasPro } = useProfile()
    const [month, setMonth] = useState(moment())
    const decrementMonth = () => {
        if (hasPro) {
            setMonth(month.clone().subtract(1, 'months'))
        } else {
            navigation.navigate('MellowPaywall')
        }
    }
    const incrementMonth = () => {
        if (hasPro) {
            setMonth(month.clone().add(1, 'months'))
        } else {
            navigation.navigate('MellowPaywall')
        }
    }

    return (
        <WaveCard>
            <V p={2}>
                <WeeklyMoodGraph {...{ month }} />
                <V row jc="space-between">
                    <Touchable onPress={decrementMonth}>
                        <V p={2}>
                            <T b1 color="Blue2">
                                {'< Previous '}
                            </T>
                        </V>
                    </Touchable>
                    <Touchable onPress={incrementMonth}>
                        <V p={2}>
                            <T b1 color="Blue2">
                                {'Next >'}
                            </T>
                        </V>
                    </Touchable>
                </V>
            </V>
        </WaveCard>
    )
}

export default withNavigation(WeeklyMoodCard)
