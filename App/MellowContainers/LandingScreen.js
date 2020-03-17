// @flow
import * as React from 'react'
import { StyleSheet, Image } from 'react-native'
import { Metrics, Colors, Images } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import MainButton from 'MellowComponents/MainButton'
import SecondaryButton from 'MellowComponents/SecondaryButton'
import WaveBackground from 'MellowComponents/WaveBackground'
import { withNavigation } from 'react-navigation'
import Analytics from 'Controllers/AnalyticsController'

type Props = {}

type State = {}

class LandingScreen extends React.Component<Props, State> {
    getStarted = () => {
        Analytics.pressGetStarted()
        this.props.navigation.navigate('OnboardingA')
    }

    goToSignIn = () => {
        this.props.navigation.navigate('SignIn')
    }

    render() {
        return (
            <WaveBackground boat heightRatio={0.5}>
                <V ai="center" jc="center" flex={1}>
                    <V>
                        <T subtitle1 color="Gray2">
                            welcome to
                        </T>
                        <V style={styles.logoBar} row jc="flex-end" ai="center">
                            <T heading1 color="Gray2">
                                reflect
                            </T>
                            <V pl={2}>
                                <Image style={styles.logo} source={Images.logo} />
                            </V>
                        </V>
                    </V>
                </V>
                <V flex={1} ai="center" jc="flex-end" pb={6}>
                    <MainButton onPress={this.getStarted} text={'Get started'} />
                    <SecondaryButton onPress={this.goToSignIn} text={'Sign in'} />
                </V>
            </WaveBackground>
        )
    }
}

const styles = StyleSheet.create({
    logo: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
        tintColor: Colors.Blue2
    },
    logoBar: {
        height: 80
    },
    waveBoatGlyph: {
        width: Metrics.screenWidth
    }
})

export default withNavigation(LandingScreen)
