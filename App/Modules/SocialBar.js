// @flow
import React from 'react'
import { StyleSheet } from 'react-native'
import { AppStyles, Metrics, Colors } from 'Themes'
import V from 'Components/V'
import Touchable from 'Components/Touchable'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { withNavigation } from 'react-navigation'
import { INSTA_URL, FB_URL, TWITTER_URL } from 'Data/urls'

type Props = {}

type State = {}

const ICON_SIZE = 40

class SocialBar extends React.Component<Props, State> {
    render() {
        return (
            <V row ai="center" jc="center" pt={2}>
                <Touchable
                    p={2}
                    ai="center"
                    jc="center"
                    onPress={() => this.props.navigation.navigate('WebView', { url: INSTA_URL })}
                >
                    <EntypoIcon
                        name="instagram-with-circle"
                        size={ICON_SIZE}
                        color={Colors.BrandM}
                    />
                </Touchable>
                <Touchable
                    p={2}
                    m={2}
                    ai="center"
                    jc="center"
                    onPress={() => this.props.navigation.navigate('WebView', { url: FB_URL })}
                >
                    <EntypoIcon
                        name="facebook-with-circle"
                        size={ICON_SIZE}
                        color={Colors.BrandM}
                    />
                </Touchable>
                <Touchable
                    p={2}
                    m={2}
                    ai="center"
                    jc="center"
                    onPress={() => this.props.navigation.navigate('WebView', { url: TWITTER_URL })}
                >
                    <EntypoIcon name="twitter-with-circle" size={ICON_SIZE} color={Colors.BrandM} />
                </Touchable>
            </V>
        )
    }
}

export default withNavigation(SocialBar)
