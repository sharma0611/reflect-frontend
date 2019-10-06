// @flow
import React from 'react'
import { Animated, StyleSheet, Image, TextInput } from 'react-native'
import { Fonts, Metrics, AppStyles, Images, Colors } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import ScreenHeader from 'Components/ScreenHeader'
import Section from 'Components/Section'
import Screen from 'Components/Screen'
import Carousel from 'react-native-snap-carousel'
import Card from 'Components/Card'
import userExposedToContainer from 'State/userExposedTo'
import AnimatedOpacity from 'HOC/AnimatedOpacity'
import AsyncStorageController from 'Controllers/AsyncStorageController'
import Analytics from 'Controllers/AnalyticsController'
import Touchable from 'Components/Touchable'

type Props = {}

type State = {}

const VALUE_PROP = [
    {
        title: 'Daily Reflection',
        subTitle: 'Three personalized questions designed for mindfulness.',
        imageUri: Images.dailyReflectionSample,
        buttonText: 'Okay...'
    },
    {
        title: 'Daily Goals',
        subTitle: 'Start your day by actively listing your goals.',
        imageUri: Images.dailyGoalsSample,
        buttonText: 'And?'
    },
    {
        title: 'Meditative Journal',
        subTitle: `It's just you and the pen. Achieve mental clarity with our guided questions.`,
        imageUri: Images.categoriesSample,
        buttonText: 'Let me in!'
    }
]

const ValuePropCard = ({ title, subTitle, imageUri, index }) => (
    <V style={AppStyles.dropShadow.large}>
        <Card p={2} bg="WhiteM">
            <T titleM color="GreyM" py={2}>
                {index + 1}) {title}
            </T>
            <T titleXS color="GreyXL" px={4}>
                {subTitle}
            </T>
            <V ai="center" py={5}>
                <Image source={imageUri} style={styles.valuePropSample} resizeMode="contain" />
            </V>
        </Card>
    </V>
)

const Button = ({ onPress, text, disabled }) => (
    <Touchable {...{ onPress, disabled }}>
        <V
            bg={disabled ? 'GreyXL' : 'BlueD'}
            style={{ borderRadius: 15, height: 50, width: 150 }}
            ai="center"
            jc="center"
        >
            <T color="WhiteM" heading pt={1}>
                {text}
            </T>
        </V>
    </Touchable>
)

class OnboardingScreen extends React.Component<Props, State> {
    state = {
        valuePropIdx: 0,
        enterName: false,
        name: ''
    }

    nextValueProp = async () => {
        if (this.state.valuePropIdx === VALUE_PROP.length - 1) {
            this.props.fadeOut(async () => {
                await this.setState({ enterName: true })
                this.props.fadeIn()
            })
        } else {
            this._carousel.snapToNext()
            await this.setState({ valuePropIdx: this.state.valuePropIdx + 1 })
        }
    }

    pressButton = async () => {
        if (this.state.enterName) {
            Analytics.pressOnboardingNext('Enter Name')
            this.props.fadeOut(async () => {
                await this.submitName(this.state.name)
                this.finishOnboarding()
            })
        } else {
            Analytics.pressOnboardingNext(VALUE_PROP[this.state.valuePropIdx].title)
            await this.nextValueProp()
        }
    }

    currentButtonText() {
        if (this.state.enterName) {
            return "That's me!"
        }
        return VALUE_PROP[this.state.valuePropIdx].buttonText
    }

    renderItem({ item, index }) {
        return <ValuePropCard {...{ index, ...item }} />
    }

    finishOnboarding() {
        userExposedToContainer.onExposedToOnboarding()
    }

    submitName = async name => {
        await AsyncStorageController.setName(name)
    }

    renderValueProps() {
        return (
            <V flex={1}>
                <ScreenHeader titleLeft={''} titleRight={'Welcome!'} />
                <Section>
                    <T titleS color="GreyXL" px={2} mb={4}>
                        Power your self-growth journey in 3 easy steps:
                    </T>
                </Section>
                <V flex={1} jc="center">
                    <Carousel
                        ref={c => {
                            this._carousel = c
                        }}
                        data={VALUE_PROP}
                        renderItem={this.renderItem}
                        sliderWidth={Metrics.screenWidth}
                        itemWidth={Metrics.screenWidth * 0.9}
                        scrollEnabled={false}
                        containerCustomStyle={{ paddingVertical: 10 }}
                    />
                </V>
            </V>
        )
    }

    renderEnterName() {
        return (
            <V>
                <ScreenHeader titleLeft={''} titleRight={'One last thing...'} />
                <Section>
                    <T titleS color="GreyXL" px={2} mb={4}>
                        Let's get to know each other!
                    </T>
                </Section>
                <Section>
                    <T titleS color="GreyM" px={2} mb={4}>
                        What's your first name?
                    </T>
                </Section>
                <Section>
                    <V px={2}>
                        <TextInput
                            style={{ color: Colors.GreyM, ...Fonts.style.titleM }}
                            onChangeText={name => this.setState({ name })}
                            value={this.state.name}
                            autoFocus={true}
                            selectionColor={Colors.GreyM}
                            onSubmitEditing={this.pressButton}
                        />
                    </V>
                </Section>
            </V>
        )
    }

    render() {
        return (
            <Screen>
                <Animated.View style={{ opacity: this.props.opacity, flex: 1 }}>
                    {this.state.enterName ? this.renderEnterName() : this.renderValueProps()}
                </Animated.View>
                <V ai="center" pb={2}>
                    <Button
                        text={this.currentButtonText()}
                        onPress={this.pressButton}
                        disabled={this.state.enterName && this.state.name.length === 0}
                    />
                </V>
            </Screen>
        )
    }
}

const styles = StyleSheet.create({
    valuePropSample: {
        width: Metrics.screenWidth * 0.8
    }
})

export default AnimatedOpacity(OnboardingScreen, 1, true)
