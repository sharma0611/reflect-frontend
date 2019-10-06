// @flow
// libs
import * as React from 'react'
import { Image, StyleSheet } from 'react-native'
import V from 'Components/V'
import Touchable from 'Components/Touchable'
// components
import isNil from 'lodash/isNil'
import space from './utils/space'

// styles
import { Metrics } from 'Themes'
const DEFAULT_HIT_SLOP = { top: 10, bottom: 10, left: 10, right: 10 }

type Props = {
    style?: any,
    wrapperStyle?: any,
    source: { uri: string } | number,
    onPress: Function,
    superTiny?: boolean,
    p?: number,
    px?: number,
    py?: number,
    tiny?: boolean,
    small?: boolean,
    medium?: boolean,
    large?: boolean,
    xLarge?: boolean,
    hitSlop?: boolean
}

class PressableImage extends React.Component<Props> {
    render() {
        const {
            style,
            wrapperStyle,
            source,
            onPress,
            superTiny,
            p,
            px,
            py,
            tiny,
            small,
            medium,
            large,
            xLarge,
            hitSlop,
            ...rest
        } = this.props

        const _style = [
            style && style,
            superTiny && styles.superTiny,
            tiny && styles.tiny,
            small && styles.small,
            medium && styles.medium,
            large && styles.large,
            xLarge && styles.xLarge,
            space(rest)
        ]

        const paddingStyles = [
            !isNil(p) && { padding: Metrics.padding.scale[p] || p },
            !isNil(px) && { paddingHorizontal: Metrics.padding.scale[px] || px },
            !isNil(py) && { paddingVertical: Metrics.padding.scale[py] || py }
        ]

        return (
            <Touchable
                onPress={onPress}
                style={wrapperStyle}
                hitSlop={hitSlop ? DEFAULT_HIT_SLOP : undefined}
            >
                <V style={paddingStyles}>
                    <Image source={source} style={_style} resizeMode="contain" {...rest} />
                </V>
            </Touchable>
        )
    }
}

const styles = StyleSheet.create({
    superTiny: {
        width: Metrics.images.superTiny,
        height: Metrics.images.superTiny
    },
    tiny: {
        width: Metrics.images.tiny,
        height: Metrics.images.tiny
    },
    small: {
        width: Metrics.images.small,
        height: Metrics.images.small
    },

    medium: {
        width: Metrics.images.medium,
        height: Metrics.images.medium
    },
    large: {
        width: Metrics.images.large,
        height: Metrics.images.large
    },
    xLarge: {
        width: Metrics.images.xLarge,
        height: Metrics.images.xLarge
    }
})

export default PressableImage
