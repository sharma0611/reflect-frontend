// @flow
import React, { useState, useEffect } from 'react'
import { Metrics, Colors } from 'Themes'
import V from 'Components/V'
import T from 'Components/T'
import useMoods from 'Hooks/useMoods'
import moment from 'moment'
import groupBy from 'lodash/groupBy'
import range from 'lodash/range'
import meanBy from 'lodash/meanBy'
import { AreaChart, XAxis } from 'react-native-svg-charts'
import { Path, Defs, LinearGradient, Stop } from 'react-native-svg'
import * as shape from 'd3-shape'
import Entry from 'Firebase/models/Entry'

const Gradient = ({ index }) => (
    <Defs key={index}>
        <LinearGradient id={'gradient'} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
            <Stop offset={'0%'} stopColor={'rgb(169,168,231)'} stopOpacity={0.5} />
            <Stop offset={'100%'} stopColor={'rgb(134, 65, 244)'} stopOpacity={0} />
        </LinearGradient>
    </Defs>
)

const Line = ({ line }) => (
    <Path key={'line'} d={line} stroke={'rgb(169,168,231)'} strokeWidth={2} fill={'none'} />
)

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
                <AreaChart
                    yMin={0}
                    yMax={2}
                    style={{ height: 150, width: chartWidth }}
                    data={weeklyData}
                    contentInset={{ top: 15, bottom: 15, left: 15, right: 15 }}
                    curve={shape.curveBasis}
                    // svg={{ stroke: 'rgb(169, 168, 231)', strokeWidth: 3 }}
                    svg={{ fill: 'url(#gradient)' }}
                    animate={true}
                    numberOfTicks={3}
                    start={0}
                >
                    <XAxis
                        style={{ marginHorizontal: -10 }}
                        data={weeklyData}
                        formatLabel={(value, index) => `W${index + 1}`}
                        contentInset={{ right: 30, left: 30 }}
                        svg={{ fontSize: 10, fill: Colors.Gray1 }}
                    />
                    <Gradient />
                    <Line />
                </AreaChart>
            </V>
        </V>
    )
}

export default WeeklyMoodGraph
