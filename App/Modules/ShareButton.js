// @flow
import React from 'react'
import { Colors } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import Card from 'Components/Card'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import Share from 'Components/Share'
import { withNavigation } from 'react-navigation'

const SHARE_COPY = {
    APP_URL: '',
    SHARE_TEXT: 'Hey 👋 – you should check out the Reflect app',
    SUBJECT: 'Hey 👋 – you should check out the Reflect app',
    MESSAGE: `Hey 👋, check out Reflect. It's a meditative journaling app. Through daily self-review and mood tracking, this app helps you be more mindful of your goals. Try it out and let me know what you think.
    IOS: https://apps.apple.com/app/id1467087641
    Android: https://play.google.com/store/apps/details?id=com.reflectapp`
}

class ShareButton extends React.Component<*> {
    // Share content
    buildShareContent = () => {
        return {
            title: SHARE_COPY.SHARE_TEXT,
            url: SHARE_COPY.APP_URL,
            subject: SHARE_COPY.SUBJECT,
            message: SHARE_COPY.MESSAGE
        }
    }
    render() {
        return (
            <Share
                content={this.buildShareContent()}
                sharedVia={this.props.sharedVia}
                onPress={this.props.navigation.goBack}
            >
                <Card bg="WhiteM" px={3} py={2} my={1}>
                    <V row py={1} ai="center">
                        <EntypoIcon name="share" size={30} color={Colors.BrandM} />
                        <V flex={8} pl={2}>
                            <T color="BrandM" heading emphasis>
                                Share this app!
                            </T>
                        </V>
                        <V flex={1}>
                            <T ta="right" color="BrandM" heading>
                                >
                            </T>
                        </V>
                    </V>
                </Card>
            </Share>
        )
    }
}

export default withNavigation(ShareButton)
