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
import Card from 'MellowComponents/Card'
import { withNavigation } from 'react-navigation'

type Props = {}

type State = {}

const WaveHeightRatio = 0.3

class OnboardingB extends React.Component<Props, State> {
    next = () => {
        this.props.navigation.navigate('PersonalizeA')
    }
    render() {
        return (
            <WaveBackground heightRatio={WaveHeightRatio}>
                <V p={4}>
                    <LeftChevron />
                </V>
                <V p={4} flex={3} pt={0}>
                    <T heading3 color="Gray1" ta="center" pl={2} pr={2}>
                        The toolkit for your mind.
                    </T>
                    <V ai="center">
                        <Image source={Images.illustrationA} style={styles.mainImg} />
                    </V>
                    <T b1 color="Gray2" pt={1} ta="center" p={2}>
                        We use science to build mindfulness activities that help you take control of
                        life.
                    </T>
                </V>
                <V
                    ai="center"
                    jc="center"
                    style={{ height: WaveHeightRatio * Metrics.screenHeight }}
                    pt={5}
                >
                    <MainButton onPress={this.next} text={'Let me in!'} />
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
    },
    mainImg: {
        maxWidth: '50%',
        resizeMode: 'contain'
    }
})

export default withNavigation(OnboardingB)
