// @flow
import React from 'react'
import { Image } from 'react-native'
import { Images, Metrics } from 'Themes'
import V from 'Components/V'
import T from 'Components/T'
import Touchable from 'Components/Touchable'
import Card from 'MellowComponents/Card'
import Analytics from 'Controllers/AnalyticsController'

export const CATEGORY_CARD_WIDTH = 220
export const CATEGORY_CARD_HEIGHT = 160

const CARD_MARGIN = 3

export const CATEGORY_CARD_MARGIN = Metrics.padding.scale[CARD_MARGIN]

const CategoryCard = ({ name, onPress, color, locked }) => {
    const onTouch = () => {
        Analytics.pressCategory(name)
        onPress()
    }

    return (
        <Touchable onPress={onTouch}>
            <Card
                style={{ width: CATEGORY_CARD_WIDTH, backgroundColor: color }}
                mr={CARD_MARGIN}
                mb={3}
            >
                {!!locked && (
                    <V pabs style={{ top: 10, right: 10 }}>
                        <Image source={Images.lock} />
                    </V>
                )}
                <V ai="flex-end" pt={5} pb={4} />
                <Image
                    source={Images.cardWaveGlyphC}
                    resizeMode="stretch"
                    style={{ width: CATEGORY_CARD_WIDTH }}
                />
                <V
                    pt={2}
                    pl={3}
                    pb={3}
                    bg="WhiteM"
                    style={{
                        borderBottomRightRadius: 30,
                        borderBottomLeftRadius: 10
                    }}
                >
                    <T heading4>{name}</T>
                </V>
            </Card>
        </Touchable>
    )
}

export default CategoryCard
