// @flow
/**
 * Util for adding spacing attributes to components
 *
 * m: margin
 * mt: margin-top
 * mr: margin-right
 * mb: margin-bottom
 * ml: margin-left
 * mx: margin-left and margin-right
 * my: margin-top and margin-bottom
 * p: padding
 * pt: padding-top
 * pr: padding-right
 * pb: padding-bottom
 * pl: padding-left
 * px: padding-left and padding-right
 * py: padding-top and padding-bottom
 */
import get from 'lodash/get'
import merge from 'lodash/merge'
import isNil from 'lodash/isNil'

import { Metrics } from 'Themes'

const defaultScale = Metrics.padding.scale

const REG = /^[mp][trblxy]?$/

const properties = {
    m: 'margin',
    p: 'padding'
}

const directions = {
    t: 'Top',
    r: 'Right',
    b: 'Bottom',
    l: 'Left',
    x: ['Left', 'Right'],
    y: ['Top', 'Bottom']
}

const getProperties = key => {
    const [a, b] = key.split('')
    const property = properties[a]
    const direction = directions[b] || ''
    return Array.isArray(direction) ? direction.map(dir => property + dir) : [property + direction]
}

const getValue = scale => n => {
    return scale[n] || n
}

const space = (props: any = {}) => {
    const keys = Object.keys(props)
        .filter(key => REG.test(key))
        .sort()
    const scale = get(props.theme, 'space') || defaultScale
    const getStyle = getValue(scale)

    return keys
        .map(key => {
            const value = props[key]
            const properties = getProperties(key)

            const style = n =>
                isNil(n)
                    ? null
                    : properties.reduce((a, prop) => ({ ...a, [prop]: getStyle(n) }), {})
            return style(value)
        })
        .reduce(merge, {})
}

export default space
