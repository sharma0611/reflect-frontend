// @flow
import React from 'react'
import { Image } from 'react-native'
import { Images, Metrics } from 'Themes'
import V from 'Components/V'
import T from 'Components/T'
import Touchable from 'Components/Touchable'
import Card from 'MellowComponents/Card'
import { withNavigation } from 'react-navigation'
import Analytics from 'Controllers/AnalyticsController'

export const ACTIVITY_CARD_WIDTH = 220
export const ACTIVITY_CARD_HEIGHT = 160

const CARD_MARGIN = 3

export const ACTIVITY_CARD_MARGIN = Metrics.padding.scale[CARD_MARGIN]

const ActivityCard = ({ activity, navigation }) => {
    const { name: title, subtitle, color } = activity

    // without an ID so that we can save it as a new response
    const { id, ...rest } = activity
    const onPress = () => {
        Analytics.pressActivity(title)
        navigation.navigate({
            routeName: 'Activity',
            params: {
                activity: { ...rest },
                index: 0
            },
            key: 0
        })
    }

    return (
        <Touchable onPress={onPress}>
            <Card
                bg="WhiteM"
                style={{ width: ACTIVITY_CARD_WIDTH, height: ACTIVITY_CARD_HEIGHT }}
                mr={CARD_MARGIN}
                flexbox
                mb={3}
            >
                <V p={3}>
                    <T heading4 style={{ color }}>
                        {title}
                    </T>
                </V>
                <Image
                    source={Images.cardWaveGlyphE}
                    resizeMode="stretch"
                    style={{ width: ACTIVITY_CARD_WIDTH, tintColor: color, marginBottom: -1 }}
                />
                <V
                    p={3}
                    pt={0}
                    jc="flex-end"
                    flex={1}
                    style={{
                        borderBottomRightRadius: 30,
                        borderBottomLeftRadius: 10,
                        backgroundColor: color
                    }}
                >
                    <T b1 color="WhiteM">
                        {subtitle}
                    </T>
                </V>
            </Card>
        </Touchable>
    )
}

export default withNavigation(ActivityCard)
