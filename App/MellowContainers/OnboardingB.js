// @flow
import * as React from 'react'
import { StyleSheet, Image } from 'react-native'
import { AppStyles, Metrics, Colors, Images } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import Screen from 'Components/Screen'
import MainButton from 'MellowComponents/MainButton'
import SecondaryButton from 'MellowComponents/SecondaryButton'
import WaveBackground from 'MellowComponents/WaveBackground'
import LeftChevron from 'MellowComponents/LeftChevron'
import Touchable from 'Components/Touchable'
import { withNavigation } from 'react-navigation'

type Props = {}

type State = {}

const WaveHeightRatio = 0.32

class OnboardingB extends React.Component<Props, State> {
    render() {
        return (
            <WaveBackground heightRatio={WaveHeightRatio}>
                <V p={3}>
                    <LeftChevron />
                </V>
                <V p={3} flex={3}>
                    <T heading3 color="Gray1">
                        Look back on what happened
                    </T>
                    <V ai="center" p={5}>
                        <Image source={Images.pausebutton} style={styles.pausebutton} />
                    </V>
                    <T heading4 color="Gray1" pt={3}>
                        Hit pause.
                    </T>
                </V>
                <V
                    ai="center"
                    jc="center"
                    style={{ height: WaveHeightRatio * Metrics.screenHeight }}
                    pt={5}
                >
                    <MainButton onPress={this.getStarted} text={'And?'} />
                </V>
            </WaveBackground>
        )
    }
}

const styles = StyleSheet.create({
    pausebutton: {
        height: 110,
        width: 110,
        resizeMode: 'contain'
    },
    logo: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
        tintColor: Colors.Blue2
    },
    logoBar: {
        height: 70
    },
    waveGlyph: {
        width: Metrics.screenWidth
    }
})

export default withNavigation(OnboardingB)
