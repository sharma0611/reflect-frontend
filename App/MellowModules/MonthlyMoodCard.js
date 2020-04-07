// @flow
import React, { useState, useEffect } from 'react'
import { withNavigation } from 'react-navigation'
import V from 'Components/V'
import T from 'Components/T'
import WaveCard from 'MellowComponents/WaveCard'
import Touchable from 'Components/Touchable'
import moment from 'moment'
import MonthlyMoodGraph from './MonthlyMoodGraph'
import useProfile from 'Hooks/useProfile'

const MonthlyMoodCard = ({ navigation }) => {
    const { hasPro } = useProfile()
    const [year, setYear] = useState(moment())
    const decrementYear = () => {
        if (hasPro) {
            setYear(year.clone().subtract(1, 'years'))
        } else {
            navigation.navigate('MellowPaywall')
        }
    }
    const incrementYear = () => {
        if (hasPro) {
            setYear(year.clone().add(1, 'years'))
        } else {
            navigation.navigate('MellowPaywall')
        }
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

export default withNavigation(MonthlyMoodCard)
