// @flow
import React, { useState, useEffect } from 'react'
import V from 'Components/V'
import T from 'Components/T'
import WaveCard from 'MellowComponents/WaveCard'
import Touchable from 'Components/Touchable'
import moment from 'moment'
import MonthlyMoodGraph from './MonthlyMoodGraph'

const MonthlyMoodCard = () => {
    const [year, setYear] = useState(moment())
    const decrementYear = () => {
        setYear(year.clone().subtract(1, 'years'))
    }
    const incrementYear = () => {
        setYear(year.clone().add(1, 'years'))
    }
    return (
        <WaveCard>
            <V p={2} pt={2}>
                <MonthlyMoodGraph {...{ year }} />
                <V row jc="space-between">
                    <Touchable onPress={decrementYear}>
                        <V p={2}>
                            <T b1 color="Blue2">
                                {'< Previous '}
                            </T>
                        </V>
                    </Touchable>
                    <Touchable onPress={incrementYear}>
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

export default MonthlyMoodCard
