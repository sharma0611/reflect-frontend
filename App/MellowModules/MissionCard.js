import React from 'react'
import { Image, Share, Linking } from 'react-native'
import { Images, Metrics, Colors } from 'Themes'
import V from 'Components/V'
import T from 'Components/T'
import Touchable from 'Components/Touchable'
import Card from 'MellowComponents/Card'
import { withNavigation } from 'react-navigation'
import { FEEDBACK_URL } from 'Data/urls'
import Analytics from 'Controllers/AnalyticsController'
import SocialBar from 'MellowModules/SocialBar'

const FEEDBACK_TEXT = `Hey Shivam,
I’m a Reflect user and I think this app would be better if... 
My favorite part of the app is...
My least favorite part of the app is... 
`
const MESSAGING_URL = `sms:+16479380024&body=${encodeURIComponent(FEEDBACK_TEXT)}`

const SHARE_COPY = {
    APP_URL: '',
    SHARE_TEXT: 'Hey 👋 – you should check out the Reflect app',
    SUBJECT: 'Hey 👋 – you should check out the Reflect app',
    MESSAGE: `Hey 👋, check out Reflect. It's a meditative journaling app. Through daily self-review and mood tracking, this app helps you be more mindful of your goals. Try it out and let me know what you think.
    IOS: https://apps.apple.com/app/id1467087641
    Android: https://play.google.com/store/apps/details?id=com.reflectapp`
}

const MissionRow = ({ leftEmoji, title, onPress }) => {
    return (
        <Touchable onPress={onPress}>
            <V p={2} row jc="center" ai="center">
                <V mx={2} style={{ width: 20 }} ai="center">
                    <T ta="center">{leftEmoji}</T>
                </V>
                <T b1 color="Gray2">
                    {title}
                </T>
                <V flex={1} />
                <V px={2}>
                    <Image
                        source={Images.smallRightChevron}
                        style={{ height: 12, width: 12, resizeMode: 'contain' }}
                    />
                </V>
            </V>
        </Touchable>
    )
}

const Seperator = () => {
    return (
        <V flex={1} ai="center">
            <V
                style={{
                    width: Metrics.screenWidth - 5 * Metrics.padding.scale[3],
                    borderBottomWidth: 0.7,
                    opacity: 0.3,
                    borderBottomColor: Colors.Gray4
                }}
            />
        </V>
    )
}

const MissionCard = ({ navigation }) => {
    const textTheFounder = () => {
        Linking.openURL(MESSAGING_URL)
    }

    const navigateToFeedbackForm = () => {
        navigation.navigate('WebView', { url: FEEDBACK_URL })
    }

    const shareTheApp = async () => {
        const shareContent = {
            title: SHARE_COPY.SHARE_TEXT,
            url: SHARE_COPY.APP_URL,
            subject: SHARE_COPY.SUBJECT,
            message: SHARE_COPY.MESSAGE
        }
        Analytics.openShare()
        const shared = await Share.share(shareContent)
        const { action } = shared
        if (action !== Share.dismissedAction) {
            Analytics.hasShared()
        }
    }

    return (
        <Card bg="WhiteM" alt>
            <V p={1} py={2}>
                <V py={1}>
                    <MissionRow
                        {...{
                            title: 'Give us feedback',
                            leftEmoji: '💌',
                            onPress: navigateToFeedbackForm
                        }}
                    />
                    <Seperator />
                    <MissionRow
                        {...{
                            title: 'Text the founder',
                            leftEmoji: '📬',
                            onPress: textTheFounder
                        }}
                    />
                    <Seperator />
                    <MissionRow
                        {...{
                            title: 'Share the app',
                            leftEmoji: '📢',
                            onPress: shareTheApp
                        }}
                    />
                </V>
            </V>
        </Card>
    )
}

export default withNavigation(MissionCard)
