import React from 'react'
import { ScrollView } from 'react-native'
import WaveBackground from 'MellowComponents/WaveBackground'

const WaveHeightRatio = 0.3

const ScrollingScreen = ({ children }) => (
    <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }}>
        <WaveBackground heightRatio={WaveHeightRatio}>{children}</WaveBackground>
    </ScrollView>
)

export default ScrollingScreen
