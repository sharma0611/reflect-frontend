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
    month: moment
}

const WeeklyMoodGraph = ({ month }: Props) => {
    const [weeklyData, setWeeklyData] = useState([])
    const fetchMoods = async currMonth => {
        const startOfMonth = month.startOf('month').toDate()
        const endOfMonth = month.endOf('month').toDate()
        const numWeeks = moment(endOfMonth).isoWeek() - moment(startOfMonth).isoWeek()
        const moodData = await Entry.moods(startOfMonth, endOfMonth)
        const weekMoods = moodData
            .filter(({ positivity }) => !!positivity)
            .map(mood => {
                const { responseText: emoji, positivity, timestamp } = mood
                const week = moment(timestamp).isoWeek() - moment(startOfMonth).isoWeek()
                return { week, emoji, positivity }
            })
        const weekGroupedMoods = groupBy(weekMoods, ({ week }) => week)

        const weekData = range(numWeeks)
            .map(weekNum => {
                const currWeek = weekGroupedMoods[weekNum]
                if (currWeek) {
                    const weekAvg = meanBy(currWeek, ({ positivity }) => positivity)
                    return weekAvg
                }
                return 0
            })
            .map(val => val + 1)
        setWeeklyData(weekData)
    }
    useEffect(() => {
        fetchMoods()
    }, [month])

    const chartWidth =
        Metrics.screenWidth - 2 * Metrics.padding.scale[2] - 2 * Metrics.padding.scale[3]
    return (
        <V>
            <T ta="center" color="Gray1">
                {month.format('MMMM YYYY')}{' '}
            </T>
            <V ai="center" pt={2}>
                <MoodGraph
                    data={weeklyData}
                    width={chartWidth}
                    formatLabel={(value, index) => `W${index + 1}`}
                />
            </V>
        </V>
    )
}

export default WeeklyMoodGraph
