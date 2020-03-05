import React from 'react'
import { ScrollView } from 'react-native'
import FixedWaveBackground from 'MellowComponents/FixedWaveBackground'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const WaveHeightRatio = 0.3

const KeyboardAware = ({ children, ...rest }) => (
    <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        enableResetScrollToCoords={false}
        nestedScrollEnabled={true}
        {...rest}
    >
        {children}
    </KeyboardAwareScrollView>
)

const ScrollingScreen = ({ children, keyboardAware, fullScreen, ...rest }) => {
    const ScrollComponent = keyboardAware ? KeyboardAware : ScrollView
    const contentContainerStyle = { flexGrow: 1 }
    return (
        <FixedWaveBackground {...{ heightRatio: WaveHeightRatio }}>
            <ScrollComponent bounces={false} {...{ contentContainerStyle, ...rest }}>
                {children}
            </ScrollComponent>
        </FixedWaveBackground>
    )
}

export default ScrollingScreen
