// @flow
//
// Method to normalize size of fonts across devices
//
// @see https://github.com/react-native-training/react-native-elements/blob/master/src/helpers/normalizeText.js
//
import { Platform, PixelRatio, Dimensions } from 'react-native'
const pixelRatio = PixelRatio.get()
const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width
// -- Testing Only --
// const fontScale = PixelRatio.getFontScale()
// const layoutSize = PixelRatio.getPixelSizeForLayoutSize(14)
// console.log('normalizeText getPR ->', pixelRatio)
// console.log('normalizeText getFS ->', fontScale)
// console.log('normalizeText getDH ->', deviceHeight)
// console.log('normalizeText getDW ->', deviceWidth)
// console.log('normalizeText getPSFLS ->', layoutSize)

// const normalize = (size: number): number => {
//     return size
// }
/* eslint-disable complexity  */
const normalize = (size: number): number => {
    if (pixelRatio >= 1 && pixelRatio < 2) {
        // iphone 5s and older Androids
        if (deviceWidth < 380) {
            return size
        }
        // iphone 5
        if (deviceHeight < 667) {
            return size * 1.1
            // iphone 6-6s
        } else if (deviceHeight >= 667 && deviceHeight <= 735) {
            return size * 1.2
        }
        // older phablets
        return size * 1.25
    } else if (pixelRatio >= 2 && pixelRatio < 3) {
        // iphone 5s and older Androids
        if (deviceWidth < 360) {
            return size * 0.95
        }
        // iphone 5
        if (deviceHeight < 667) {
            return size
            // iphone 6-6s
        } else if (deviceHeight >= 667 && deviceHeight <= 735) {
            return size
        }
        // older phablets
        return size
    } else if (pixelRatio >= 3 && pixelRatio < 3.5) {
        // catch Android font scaling on small machines
        // where pixel ratio / font scale ratio => 3:3
        if (deviceWidth <= 360) {
            return size
        }
        // Catch other weird android width sizings
        if (deviceHeight < 667) {
            return size * 1.15
            // catch in-between size Androids and scale font up
            // a tad but not too much
        }
        if (deviceHeight >= 667 && deviceHeight <= 735) {
            return size * 1.2
        }
        // catch larger devices
        // ie iphone 6s plus / 7 plus / mi note 等等
        return size
    } else if (pixelRatio >= 3.5) {
        // catch Android font scaling on small machines
        // where pixel ratio / font scale ratio => 3:3
        if (deviceWidth <= 360) {
            return size
            // Catch other smaller android height sizings
        }
        if (deviceHeight < 667) {
            return size * 1.2
            // catch in-between size Androids and scale font up
            // a tad but not too much
        }
        if (deviceHeight >= 667 && deviceHeight <= 735) {
            return size * 1.25
        }
        // catch larger phablet devices
        return size * 1.4
    }
    // if older device ie pixelRatio !== 2 || 3 || 3.5
    else return size * 1.2
}

// alternative implementation, stolen from F8 app
const DEVICE_SCALE = deviceWidth / 375

export function normalizeAlt(size: number): number {
    return size
    // return Math.round(DEVICE_SCALE * size)
}

// attempt to normalize x-platform line heights
export function lineHeight(val: number = 1, scale: number = 1, normalized: boolean = true): number {
    let adjusted = normalized ? normalize(val) : val
    return Math.round(Platform.OS === 'android' ? adjusted * scale : adjusted)
}

export default normalizeAlt
