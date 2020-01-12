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
        this.props.navigation.navigate('OnboardingD')
    }
    render() {
        return (
            <WaveBackground heightRatio={WaveHeightRatio}>
                <V p={4}>
                    <LeftChevron />
                </V>
                <V p={4} flex={3} pt={0}>
                    <T heading3 color="Gray1">
                        Look forward to your next step
                    </T>
                    <V ai="center" p={3} pt={5}>
                        <Card bg="PastelGreenM" style={{ width: Metrics.screenWidth * 0.8 }}>
                            <V ai="flex-end" pt={3} pr={5}>
                                <V style={{ width: 60, height: 35 }}>
                                    <V pabs style={{ top: 0, right: 0 }}>
                                        <Image
                                            source={Images.planet}
                                            style={{ width: 30, height: 30, resizeMode: 'contain' }}
                                        />
                                    </V>
                                </V>
                            </V>
                            <V p={3} pt={0}>
                                <T b1 color="Gray2">
                                    Set life goals.
                                </T>
                                <T b1 color="Gray2">
                                    Set mini-victories each week.
                                </T>
                                <T b1 color="Gray2">
                                    Be the captain of your journey.
                                </T>
                            </V>
                            <Image
                                source={Images.cardWaveGlyphA}
                                style={{ width: Metrics.screenWidth * 0.8 }}
                            />
                            <V
                                pl={3}
                                pb={3}
                                bg="WhiteM"
                                style={{
                                    borderBottomRightRadius: 30,
                                    borderBottomLeftRadius: 10
                                }}
                            >
                                <T heading4>Weekly Goals</T>
                            </V>
                        </Card>
                    </V>
                    <T heading4 color="Gray1" pt={3} ta="center">
                        Hit play.
                    </T>
                </V>
                <V
                    ai="center"
                    jc="center"
                    style={{ height: WaveHeightRatio * Metrics.screenHeight }}
                    pt={5}
                >
                    <MainButton onPress={this.next} text={'OKAY...'} />
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
