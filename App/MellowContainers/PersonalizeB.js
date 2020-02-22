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
import Touchable from 'Components/Touchable'
import Analytics from 'Controllers/AnalyticsController'

type Props = {}

type State = {
    name: string
}

const WaveHeightRatio = 0.3

const CATEGORY_MARGIN = 3
const CATEGORY_CARD_WIDTH = Metrics.screenWidth * 0.5
const SNAP_INTERVAL = CATEGORY_CARD_WIDTH + Metrics.padding.scale[CATEGORY_MARGIN]

const CATEGORIES = [
    { name: 'Motivated', color: 'PastelGreen' },
    { name: 'Purposeful', color: 'PastelPink' },
    { name: 'Calm', color: 'PastelSkyBlue' },
    { name: 'Confident', color: 'PastelRed' },
    { name: 'Hopeful', color: 'PastelPurplePink' },
    { name: 'Grateful', color: 'PastelPurpleL' }
]

const CIRCLE_WIDTH = 30

class PersonalizeB extends React.Component<Props, State> {
    state = {
        wantToFeel: ''
    }

    submit = () => {
        Analytics.submitFeels(this.state.wantToFeel)
        this.props.navigation.navigate('PersonalizeC')
    }

    renderCategory = category => {
        const { name, color } = category
        return (
            <Touchable onPress={() => this.setState({ wantToFeel: name })}>
                <Card bg={color} style={{ width: CATEGORY_CARD_WIDTH }} mr={CATEGORY_MARGIN} mb={3}>
                    {this.state.wantToFeel === name && (
                        <V pabs style={{ right: 0, top: 0 }} pt={2} pr={2}>
                            <V
                                bg="WhiteM"
                                ai="center"
                                jc="center"
                                style={{
                                    height: CIRCLE_WIDTH,
                                    width: CIRCLE_WIDTH,
                                    borderRadius: CIRCLE_WIDTH / 2
                                }}
                            >
                                <Image
                                    source={Images.check}
                                    resizeMode="contain"
                                    style={{
                                        height: CIRCLE_WIDTH - 10,
                                        width: CIRCLE_WIDTH - 10,
                                        tintColor: Colors.Green1
                                    }}
                                />
                            </V>
                        </V>
                    )}
                    <V ai="flex-end" pt={5} pb={4} />
                    <Image
                        source={Images.cardWaveGlyphC}
                        resizeMode="stretch"
                        style={{ width: CATEGORY_CARD_WIDTH }}
                    />
                    <V
                        pt={2}
                        pl={3}
                        pb={3}
                        bg="WhiteM"
                        style={{
                            borderBottomRightRadius: 30,
                            borderBottomLeftRadius: 10
                        }}
                    >
                        <T heading4>{name}</T>
                    </V>
                </Card>
            </Touchable>
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
                        How do you want Reflect to make you feel?
                    </T>
                </V>
                <V>
                    <ScrollView
                        horizontal
                        snapToAlignment="start"
                        decelerationRate={0}
                        snapToInterval={SNAP_INTERVAL}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            marginLeft: Metrics.padding.xLarge,
                            paddingRight: Metrics.padding.xLarge,
                            marginBottom: Metrics.padding.small
                        }}
                    >
                        {CATEGORIES.map((category, index) => this.renderCategory(category))}
                    </ScrollView>
                </V>
                <V ai="center" pt={2} pl={4} pr={4}>
                    <MainButton
                        fullWidth
                        disabled={this.state.wantToFeel === ''}
                        onPress={() => this.submit()}
                        text={`I want to feel ${
                            this.state.wantToFeel ? this.state.wantToFeel : '_'
                        }`}
                    />
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
