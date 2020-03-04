import React from 'react'
import { StyleSheet } from 'react-native'
import { Metrics } from 'Themes'
import V from 'Components/V'
import WaveBackground from 'MellowComponents/WaveBackground'

const FixedWaveBackground = ({ children, ...rest }) => (
    <V flex={1} style={styles.outerbox}>
        <V pabs style={StyleSheet.absoluteFill}>
            <WaveBackground {...rest} />
        </V>
        {children}
    </V>
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
