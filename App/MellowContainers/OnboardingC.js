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
import MoodRow from 'MellowComponents/MoodRow'
import { withNavigation } from 'react-navigation'

type Props = {}

type State = {}

const WaveHeightRatio = 0.3

const MOOD_DATA = [
    { day: 'S', emoji: '🤣' },
    { day: 'M', emoji: '‍️🤓' },
    { day: 'T', emoji: '😛' },
    { day: 'W', emoji: '' },
    { day: 'T', emoji: '' },
    { day: 'F', emoji: '' },
    { day: 'S', emoji: '' }
]

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
                    <T heading3 color="Gray1" ta="center" pl={2} pr={2}>
                        Track your mood in emojis
                    </T>
                    <V ai="center" p={3} pt={5}>
                        <Card bg="WhiteM" style={{ width: Metrics.screenWidth * 0.8 }}>
                            <Image
                                source={Images.cardWaveF}
                                style={{
                                    width: '100%',
                                    tintColor: Colors.PastelPurple
                                }}
                            />
                            <V p={3}>
                                <MoodRow moodData={MOOD_DATA} />
                            </V>
                            <V pl={4} pb={3} bg="WhiteM" pt={2}>
                                <T heading4>Daily Mood</T>
                            </V>
                        </Card>
                    </V>
                    <T heading4 color="Gray1" pt={3} ta="center">
                        Look back on highs & lows.
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
