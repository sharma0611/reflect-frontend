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

const WaveHeightRatio = 0.3

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
                    <T heading3 color="Gray1" ta="center" pl={2} pr={2}>
                        reflect is a guided journal for mindfulness
                    </T>
                    <V ai="center" p={3}>
                        <Image source={Images.book} style={styles.book} />
                    </V>
                    <T heading4 color="Gray1" ta="center" p={2}>
                        Unload what’s on your mind with our tailored questions.
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
    book: {
        width: '60%',
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
