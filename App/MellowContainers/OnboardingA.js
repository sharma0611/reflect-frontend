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
import Touchable from 'Components/Touchable'
import { withNavigation } from 'react-navigation'

type Props = {}

type State = {}

class OnboardingA extends React.Component<Props, State> {
    render() {
        return (
            <WaveBackground heightRatio={0.35}>
                <V p={3}>
                    <Touchable onPress={() => this.props.navigation.goBack()}>
                        <Image source={Images.leftChevron} />
                    </Touchable>
                </V>
                <V flex={1}>
                    <V flex={1} ai="center" jc="center"></V>
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
        height: 70
    },
    waveGlyph: {
        width: Metrics.screenWidth
    }
})

export default withNavigation(OnboardingA)
