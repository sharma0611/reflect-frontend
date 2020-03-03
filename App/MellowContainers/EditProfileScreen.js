// @flow
import React from 'react'
import T from 'Components/T'
import V from 'Components/V'
import MainButton from 'MellowComponents/MainButton'
import WaveBackground from 'MellowComponents/WaveBackground'
import LeftChevron from 'MellowComponents/LeftChevron'
import WhiteField from 'MellowComponents/WhiteField'
import { withNavigation } from 'react-navigation'

type Props = {}

type State = {
    name: string
}

class EditProfileScreen extends React.Component<Props, State> {
    state = {
        name: ''
    }

    submit = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <WaveBackground>
                <V p={4}>
                    <LeftChevron />
                </V>
                <V p={4} pt={0}>
                    <T heading4 color="Gray1" pt={4}>
                        Enter your name!
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
export default withNavigation(EditProfileScreen)
