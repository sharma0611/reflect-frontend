// @flow
import * as React from 'reactn'
import { StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native'
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
import AsyncStorageController from 'Controllers/AsyncStorageController'

type Props = {}

type State = {
    name: string
}

const WaveHeightRatio = 0.3

class PersonalizeA extends React.Component<Props, State> {
    state = {
        name: ''
    }

    submit = async () => {
        const { name } = this.state
        await AsyncStorageController.setName(name)
        await this.setGlobal({ ...global, name })
        this.props.navigation.navigate('PersonalizeB')
    }

    render() {
        return (
            <WaveBackground heightRatio={WaveHeightRatio}>
                <V p={4}>
                    <LeftChevron />
                </V>
                <V p={4} pt={0}>
                    <T heading3 color="Gray1">
                        Let's get to know each other!
                    </T>
                    <T heading4 color="Gray1" pt={4}>
                        What's your name?
                    </T>
                    <WhiteField
                        submit={this.submit}
                        onChangeText={text => this.setState({ name: text })}
                    />
                </V>
                <V ai="center" pt={2}>
                    <MainButton
                        disabled={this.state.name.length === 0}
                        onPress={this.submit}
                        text={`That's me!`}
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

export default withNavigation(PersonalizeA)
