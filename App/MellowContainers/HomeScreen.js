// @flow
import React from 'react'
import { StyleSheet, Image } from 'react-native'
import V from 'Components/V'
import T from 'Components/T'
import Screen from 'Components/Screen'
import WaveBackground from 'MellowComponents/WaveBackground'
import DailyReflectionCard from 'MellowComponents/DailyReflectionCard'

const WaveHeightRatio = 0.3

const Header = ({ header, subtitle }) => {
    return (
        <V pt={3}>
            <T heading4 color="Gray2">
                {header}
            </T>
            <V pt={2}>
                <T subtitle2 color="Gray2">
                    {subtitle}
                </T>
            </V>
        </V>
    )
}

const HomeScreen = () => {
    return (
        <WaveBackground heightRatio={WaveHeightRatio}>
            <V p={4}>
                <T heading3 color="Gray2">
                    Hi Shivam!
                </T>
                <Header
                    {...{ header: 'Today', subtitle: 'Hit pause. Reflect on what happened.' }}
                />
                <V p={2} pt={3} mb={2}>
                    <DailyReflectionCard />
                </V>
                <Header
                    {...{ header: 'On my mind', subtitle: 'Activities to unload my thoughts.' }}
                />
            </V>
        </WaveBackground>
    )
}

HomeScreen.navigationOptions = {
    header: null
}

export default HomeScreen
