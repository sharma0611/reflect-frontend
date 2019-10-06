import { Dimensions, PixelRatio, Platform } from 'react-native'

const deviceHeight = Dimensions.get('window').height

const IPHONE_X = 812
const IPHONE_XS = 896

export function isIphoneX() {
    const dim = Dimensions.get('window')

    return (
        // This has to be iOS
        Platform.OS === 'ios' &&
        // Check either, iPhone X or XR
        (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
    )
}

export function isIPhoneXSize(dim) {
    return dim.height === IPHONE_X || dim.width === IPHONE_X
}

export function isIPhoneXrSize(dim) {
    return dim.height === IPHONE_XS || dim.width === IPHONE_XS
}

const DEVICE_SCALE_WITH = 667 // TODO: switch to IPHONE_X here

const normalize = size => {
    return (size / DEVICE_SCALE_WITH) * deviceHeight
}

// ALTERNATIVE IMPLEMENTATION USING WITH
const DEVICE_SCALE = Dimensions.get('window').width / 375
export const normalizeAlt = size => {
    return Math.round(DEVICE_SCALE * size)
}

export default normalize

// alternative responsive function.
// uses percentage sizing which is relative to pixel density:
// https://medium.com/building-with-react-native/how-to-develop-responsive-uis-with-react-native-1x03-a448097c9503
//
// example: `width: ${widthPercentageToDP('98%')}`
const widthPercentageToDP = widthPercent => {
    const screenWidth = Dimensions.get('window').width
    // Convert string input to decimal number
    const elemWidth = parseFloat(widthPercent)
    return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100)
}
const heightPercentageToDP = heightPercent => {
    const screenHeight = Dimensions.get('window').height
    // Convert string input to decimal number
    const elemHeight = parseFloat(heightPercent)
    return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100)
}
export { widthPercentageToDP, heightPercentageToDP }
