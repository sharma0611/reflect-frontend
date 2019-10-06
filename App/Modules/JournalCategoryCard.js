// @flow
import * as React from 'react'
import { Metrics, Colors } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import TouchableCard from 'Components/TouchableCard'
import MIIcon from 'react-native-vector-icons/MaterialIcons'
import { withNavigation } from 'react-navigation'

export const CATEGORY_CARD_WIDTH = Metrics.screenWidth * 0.6
export const CATEGORY_CARD_HEIGHT = Metrics.screenHeight * 0.12

const JournalCategoryCard = ({ category, ...rest }) => {
    const { title, paywall, color, renderIcon } = category
    const { navigation } = rest
    const onPress = paywall
        ? () => navigation.navigate('Paywall')
        : () => navigation.navigate('JournalCategory', { category: title })
    return (
        <TouchableCard
            bg={color}
            px={1}
            py={2}
            my={1}
            gradient
            onPress={onPress}
            {...rest}
            width={CATEGORY_CARD_WIDTH}
            height={CATEGORY_CARD_HEIGHT}
        >
            <V flex={1} pl={2} pb={1} jc="flex-end">
                <T color="WhiteM" emphasis titleS>
                    {title}
                </T>
            </V>
            <V pabs style={{ right: Metrics.padding.medium, bottom: Metrics.padding.normal }}>
                {renderIcon()}
            </V>
            {paywall && (
                <V pabs style={{ top: Metrics.padding.medium, left: Metrics.padding.medium }}>
                    <MIIcon size={15} name="lock" color={Colors.WhiteM} />
                </V>
            )}
        </TouchableCard>
    )
}

export default withNavigation(JournalCategoryCard)
