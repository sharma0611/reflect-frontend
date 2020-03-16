// @flow
import React from 'react'
import { Image } from 'react-native'
import { Images } from 'Themes'
import V from 'Components/V'
import Touchable from 'Components/Touchable'
import { withNavigation } from 'react-navigation'
import { INSTA_URL, FB_URL, TWITTER_URL } from 'Data/urls'

type Props = {}

type State = {}

const ICON_SIZE = 20

const SocialIcon = ({ icon }) => (
    <Image style={{ width: ICON_SIZE, height: ICON_SIZE, resizeMode: 'contain' }} source={icon} />
)

class SocialBar extends React.Component<Props, State> {
    render() {
        return (
            <V row ai="center" jc="center" py={2}>
                <Touchable
                    ai="center"
                    jc="center"
                    onPress={() => this.props.navigation.navigate('WebView', { url: INSTA_URL })}
                >
                    <SocialIcon icon={Images.insta} />
                </Touchable>
                <V px={3}>
                    <Touchable
                        ai="center"
                        jc="center"
                        onPress={() => this.props.navigation.navigate('WebView', { url: FB_URL })}
                    >
                        <SocialIcon icon={Images.fb} />
                    </Touchable>
                </V>
                <Touchable
                    ai="center"
                    jc="center"
                    onPress={() => this.props.navigation.navigate('WebView', { url: TWITTER_URL })}
                >
                    <SocialIcon icon={Images.twitter} />
                </Touchable>
            </V>
        )
    }
}

export default withNavigation(SocialBar)
