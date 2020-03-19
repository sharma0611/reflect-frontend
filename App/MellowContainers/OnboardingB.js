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
import Analytics from 'Controllers/AnalyticsController'

type Props = {}

type State = {}

const WaveHeightRatio = 0.3

class OnboardingB extends React.Component<Props, State> {
    next = () => {
        Analytics.pressOnboardingNext('OnboardingB')
        this.props.navigation.navigate('OnboardingC')
    }
    render() {
        return (
            <WaveBackground heightRatio={WaveHeightRatio}>
                <V p={4}>
                    <LeftChevron />
                </V>
                <V p={4} flex={1} pt={0}>
                    <T heading3 color="Gray1" ta="center" pl={2} pr={2}>
                        Three daily questions
                    </T>
                    <V ai="center" p={3} pt={5} jc="center">
                        <Card bg="PastelPurple" style={{ width: Metrics.screenWidth * 0.8 }}>
                            <V ai="flex-end" pt={3} pr={5}>
                                <V style={{ width: 60, height: 35 }}>
                                    <V pabs style={{ bottom: 0, left: 0 }}>
                                        <Image
                                            source={Images.cloudA}
                                            style={{ width: 40, height: 30, resizeMode: 'contain' }}
                                        />
                                    </V>
                                    <V pabs style={{ top: 0, right: 0 }}>
                                        <Image
                                            source={Images.moon}
                                            style={{ width: 20, height: 20, resizeMode: 'contain' }}
                                        />
                                    </V>
                                </V>
                            </V>
                            <V p={4} pt={4}>
                                <T b1 color="WhiteM">
                                    Wind down from your day.
                                </T>
                                <T b1 color="WhiteM">
                                    Be grateful and introspective.
                                </T>
                            </V>
                            <Image
                                source={Images.cardWaveGlyphA}
                                style={{ width: Metrics.screenWidth * 0.8 }}
                            />
                            <V
                                pl={4}
                                pb={3}
                                bg="WhiteM"
                                style={{
                                    borderBottomRightRadius: 30,
                                    borderBottomLeftRadius: 10
                                }}
                            >
                                <T heading4>Daily Reflection</T>
                            </V>
                        </Card>
                    </V>
                    <T heading4 color="Gray1" pt={3} ta="center">
                        Takes just 3 minutes.
                    </T>
                </V>
                <V
                    ai="center"
                    jc="center"
                    style={{ height: WaveHeightRatio * Metrics.screenHeight }}
                    pt={5}
                >
                    <MainButton onPress={this.next} text={'And?'} />
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
