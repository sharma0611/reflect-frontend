/** @flow
 *
 * Use this instead of Views.
 * More declarative layout handling
 *
 *
 * Eamples
 *
 * <V mv={4} br={5}><Pants /></V>
 * <V row jc="space-between"><ShortPants /><LongPants /></V>
 */
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Colors, Metrics } from 'Themes'

import space from 'Components/utils/space'

import isNil from 'lodash/isNil'

import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import LinearGradient from 'react-native-linear-gradient'

type Props = {
    children?: React.Node,
    style?: StyleObj,
    bg?: string,
    pabs?: boolean,
    row?: boolean,
    column?: boolean,
    jc?: string,
    ai?: string,
    flex?: number,
    br?: number,
    gradient?: boolean
}

class V extends React.Component<Props> {
    static defaultProps = {
        animationDuration: 400
    }

    render() {
        const {
            children,
            style,
            flex,
            bg,
            row,
            column,
            pabs,
            jc,
            ai,
            br,
            gradient,
            ...rest
        } = this.props

        const _style = [
            style && style,
            flex && { flex },
            bg && { backgroundColor: Colors.getColor(bg) },
            row && { flexDirection: 'row' },
            column && { flexDirection: 'column' },
            pabs && { position: 'absolute' },
            jc && { justifyContent: jc },
            ai && { alignItems: ai },
            !isNil(br) && { borderRadius: Metrics.borderRadius.scale[br] },
            space(rest)
        ]

        const _gradientStyle = [!isNil(br) && { borderRadius: Metrics.borderRadius.scale[br] }]

        const gradientProps = {
            start: { x: 1, y: 0 },
            end: { x: 0, y: 0.3 },
            colors: ['rgba(0, 0, 0,0.13)', 'rgba(0, 0, 0, 0.01)']
        }

        return (
            <View style={_style} {...rest}>
                {gradient && (
                    <LinearGradient
                        style={[StyleSheet.absoluteFill, _gradientStyle]}
                        {...gradientProps}
                    />
                )}
                {children}
            </View>
        )
    }
}

export default V
