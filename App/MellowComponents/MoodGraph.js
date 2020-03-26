// @flow
import * as React from 'react'
import { Colors } from 'Themes'
import { AreaChart, XAxis } from 'react-native-svg-charts'
import { Path, Defs, LinearGradient, Stop } from 'react-native-svg'
import * as shape from 'd3-shape'

type Props = {
    data: Array<number>,
    width: number,
    formatLabel: Function
}

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

const MoodGraph = ({ data, width, formatLabel }: Props) => {
    return (
        <AreaChart
            yMin={0}
            yMax={2}
            style={{ height: 150, width }}
            data={data}
            contentInset={{ top: 15, bottom: 15, left: 15, right: 15 }}
            curve={shape.curveBasis}
            svg={{ fill: 'url(#gradient)' }}
            animate={true}
            numberOfTicks={3}
            start={0}
        >
            <XAxis
                style={{ marginHorizontal: -10 }}
                data={data}
                formatLabel={formatLabel}
                contentInset={{ right: 30, left: 30 }}
                svg={{ fontSize: 10, fill: Colors.Gray1 }}
            />
            <Gradient />
            <Line />
        </AreaChart>
    )
}

export default MoodGraph
