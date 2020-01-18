// @flow
import * as React from 'react'
import { StyleSheet, TextInput, Image, ScrollView } from 'react-native'
import { AppStyles, Metrics, Colors, Images, Fonts } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import Screen from 'Components/Screen'
import MainButton from 'MellowComponents/MainButton'
import SecondaryButton from 'MellowComponents/SecondaryButton'
import WaveBackground from 'MellowComponents/WaveBackground'
import LeftChevron from 'MellowComponents/LeftChevron'
import Card from 'MellowComponents/Card'
import WhiteField from 'MellowComponents/WhiteField'
import { withNavigation } from 'react-navigation'
import userExposedToContainer from 'State/userExposedTo'

type Props = {}

type State = {
    name: string
}

const WaveHeightRatio = 0.3

const CATEGORIES = [
    { name: 'Motivated', color: '' },
    { name: 'Purposeful', color: '' },
    { name: 'Calm', color: '' },
    { name: 'Confident', color: '' },
    { name: 'Helpful', color: '' },
    { name: 'Grateful', color: '' }
]

class PersonalizeB extends React.Component<Props, State> {
    state = {
        wantToFeel: []
    }

    submit = () => {
        console.log(`👨‍🌾 => `, this.state.feelingToday)
        // this.props.navigation.navigate('PersonalizeC')
        this.finishOnboarding()
    }

    finishOnboarding() {
        userExposedToContainer.onExposedToOnboarding()
    }

    renderCategory = category => {
        const { name, color } = category
        return (
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
        )
    }

    render() {
        return (
            <WaveBackground heightRatio={WaveHeightRatio}>
                <V p={4}>
                    <LeftChevron />
                </V>
                <V p={4} pt={0}>
                    <T heading3 color="Gray1">
                        Let's personalize your journey!
                    </T>
                    <T heading4 color="Gray1" pt={4}>
                        How do you want to feel after using Reflect?
                    </T>
                    <ScrollView
                        horizontal
                        snapToAlignment="start"
                        decelerationRate={0}
                        // snapToInterval={SNAP_INTERVAL}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            marginLeft: Metrics.padding.medium,
                            paddingRight: Metrics.padding.medium,
                            marginBottom: Metrics.padding.small
                        }}
                    >
                        {CATEGORIES.map((category, index) => this.renderCategory(category))}
                    </ScrollView>
                </V>
                <V ai="center" pt={2}>
                    <MainButton onPress={() => this.submit()} text={`That's me!`} />
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

export default withNavigation(PersonalizeB)
