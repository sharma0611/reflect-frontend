// @flow
import React, { useState, useEffect } from 'react'
import V from 'Components/V'
import T from 'Components/T'
import WaveCard from 'MellowComponents/WaveCard'
import Touchable from 'Components/Touchable'
import moment from 'moment'
import WeeklyMoodGraph from './WeeklyMoodGraph'

const WeeklyMoodCard = () => {
    const [month, setMonth] = useState(moment())
    const decrementMonth = () => {
        setMonth(month.clone().subtract(1, 'months'))
    }
    const incrementMonth = () => {
        setMonth(month.clone().add(1, 'months'))
    }
    return (
        <WaveCard>
            <V p={2} pt={2}>
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

export default WeeklyMoodCard
