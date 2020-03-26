// @flow
import React, { useState, useEffect } from 'react'
import { Metrics, Colors } from 'Themes'
import V from 'Components/V'
import T from 'Components/T'
import moment from 'moment'
import groupBy from 'lodash/groupBy'
import range from 'lodash/range'
import meanBy from 'lodash/meanBy'
import Entry from 'Firebase/models/Entry'
import MoodGraph from 'MellowComponents/MoodGraph'

type Props = {
    year: moment
}

const MonthlyMoodGraph = ({ year }: Props) => {
    const [monthlyData, setMonthlyData] = useState([])
    const fetchMoods = async currMonth => {
        const startOfMonth = year.startOf('year').toDate()
        const endOfMonth = year.endOf('year').toDate()
        const numMonths = 12
        const moodData = await Entry.moods(startOfMonth, endOfMonth)
        const monthMoods = moodData
            .filter(({ positivity }) => !!positivity)
            .map(mood => {
                const { responseText: emoji, positivity, timestamp } = mood
                const month = moment(timestamp).month()
                return { month, emoji, positivity }
            })
        const monthGroupedMoods = groupBy(monthMoods, ({ month }) => month)

        const monthData = range(numMonths)
            .map(monthNum => {
                const currMonth = monthGroupedMoods[monthNum]
                if (currMonth) {
                    const avg = meanBy(currMonth, ({ positivity }) => positivity)
                    return avg
                }
                return 0
            })
            .map(val => val + 1)
        setMonthlyData(monthData)
    }
    useEffect(() => {
        fetchMoods()
    }, [year])

    const chartWidth =
        Metrics.screenWidth - 2 * Metrics.padding.scale[2] - 2 * Metrics.padding.scale[3]
    return (
        <V>
            <T ta="center" color="Gray1">
                {year.format('YYYY')}
            </T>
            <V ai="center" pt={2}>
                <MoodGraph
                    data={monthlyData}
                    width={chartWidth}
                    formatLabel={(value, index) =>
                        moment()
                            .month(index)
                            .format('MMMM')[0]
                    }
                />
            </V>
        </V>
    )
}

export default MonthlyMoodGraph
