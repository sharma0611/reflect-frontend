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

class OnboardingA extends React.Component<Props, State> {
    next = () => {
        this.props.navigation.navigate('OnboardingB')
    }
    render() {
        return (
            <WaveBackground heightRatio={WaveHeightRatio}>
                <V p={4}>
                    <LeftChevron />
                </V>
                <V p={4} flex={3} pt={0}>
                    <T heading3 color="Gray1">
                        reflect is your pause button for life.
                    </T>
                    <V ai="center" p={3}>
                        <Image source={Images.pausebutton} style={styles.pausebutton} />
                    </V>
                    <T heading4 color="Gray1" pt={3}>
                        We give you the tools to hit pause, become self aware, then go back to play.
                    </T>
                </V>
                <V
                    ai="center"
                    jc="center"
                    style={{ height: WaveHeightRatio * Metrics.screenHeight }}
                    pt={5}
                >
                    <MainButton onPress={this.next} text={'How does it work?'} />
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

export default withNavigation(OnboardingA)
