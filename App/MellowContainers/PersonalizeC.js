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
import { withNavigation } from 'react-navigation'
import userExposedToContainer from 'State/userExposedTo'
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
    { name: 'My dream physique' },
    { name: 'Strong financial freedom' },
    { name: 'The peak of my career' },
    { name: 'Making my family happy and proud' },
    { name: 'Helping as many people as I can' },
    { name: 'Having a high growht mindset' }
]

const CIRCLE_WIDTH = 30

class PersonalizeB extends React.Component<Props, State> {
    state = {
        lifeGoals: []
    }

    submit = () => {
        this.finishOnboarding()
        Analytics.submitLifeGoals(this.state.lifeGoals)
    }

    finishOnboarding() {
        userExposedToContainer.onExposedToOnboarding()
    }

    toggleGoal = name => {
        this.setState(({ lifeGoals }) => {
            if (lifeGoals.includes(name)) {
                lifeGoals = lifeGoals.filter(value => value !== name)
            } else {
                lifeGoals.push(name)
            }
            return { lifeGoals }
        })
    }

    renderCategory = category => {
        const { name } = category
        return (
            <Touchable onPress={() => this.toggleGoal(name)}>
                <Card
                    bg="BabyBlueM"
                    style={{ width: CATEGORY_CARD_WIDTH, height: 150 }}
                    mr={CATEGORY_MARGIN}
                    mb={3}
                >
                    {this.state.lifeGoals.includes(name) && (
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
                    <V pt={3} pb={2} />
                    <Image
                        source={Images.cardWaveGlyphD}
                        resizeMode="stretch"
                        style={{ width: CATEGORY_CARD_WIDTH, marginBottom: -5 }}
                    />
                    <V
                        pt={2}
                        pl={3}
                        pb={3}
                        pr={3}
                        bg="WhiteM"
                        flex={1}
                        jc="flex-end"
                        style={{
                            borderBottomRightRadius: 30,
                            borderBottomLeftRadius: 10
                        }}
                    >
                        <T body3>{name}</T>
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
                        What are you working towards in life?
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
                <V ai="center" pt={2}>
                    <MainButton
                        disabled={this.state.lifeGoals.length === 0}
                        onPress={() => this.submit()}
                        text={'Those are my goals'}
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
