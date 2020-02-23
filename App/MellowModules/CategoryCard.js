// @flow
import React from 'react'
import { Image } from 'react-native'
import { Images, Metrics } from 'Themes'
import V from 'Components/V'
import T from 'Components/T'
import Touchable from 'Components/Touchable'
import Card from 'MellowComponents/Card'

export const CATEGORY_CARD_WIDTH = 220
export const CATEGORY_CARD_HEIGHT = 160

const CARD_MARGIN = 3

export const CATEGORY_CARD_MARGIN = Metrics.padding.scale[CARD_MARGIN]

const CategoryCard = ({ name, onPress, color }) => (
    <Touchable onPress={onPress}>
        <Card
            style={{ width: CATEGORY_CARD_WIDTH, backgroundColor: color }}
            mr={CARD_MARGIN}
            mb={3}
        >
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

export default CategoryCard
