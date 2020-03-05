import React from 'react'
import { StyleSheet } from 'react-native'
import { Metrics } from 'Themes'
import V from 'Components/V'
import WaveBackground from 'MellowComponents/WaveBackground'
import BlueBackground from 'MellowComponents/BlueBackground'

const FixedWaveBackground = ({ children, fullScreen, ...rest }) => (
    <BlueBackground flex={1} {...{ fullScreen }} style={styles.outerbox}>
        <V pabs style={StyleSheet.absoluteFill}>
            <WaveBackground {...{ fullScreen, ...rest }} />
        </V>
        {children}
    </BlueBackground>
)

const styles = StyleSheet.create({
    outerbox: {
        overflow: 'hidden'
    },
    background: {
        height: Metrics.screenHeight,
        width: Metrics.screenWidth
    }
})

export default FixedWaveBackground
