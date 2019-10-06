// @flow
import { Dimensions, Platform, StatusBar } from 'react-native'
import normalizeSpace from './Utils/normalizeSpacing'
import normalizeText from './Utils/normalizeText'

const { width, height } = Dimensions.get('window')

const iPhoneXBreakpoint = 812

/* eslint-disable complexity */
export function isIphoneX() {
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (height === iPhoneXBreakpoint || width === iPhoneXBreakpoint)
    )
}
/* eslint-disable complexity */

export function getStatusBarHeight() {
    if (isIphoneX()) {
        return 44
    } else if (Platform.OS === 'ios') {
        return 20
    } else {
        return StatusBar.currentHeight
    }
}

const evaluateIfIphoneX = (a: any, b: any) => {
    if (isIphoneX()) {
        return a
    } else {
        return b
    }
}

const normalizedPaddingScale = [2, 4, 10, 16, 24, 32, 48, 80, 110].map(normalizeSpace)
const normalizedBorderRadiusScale = [2, 4, 8, 16, 24].map(normalizeSpace)

// Used via Metrics.baseMargin
const metrics = {
    horizontalLineHeight: 1,
    screenWidth: width < height ? width : height,

    // Responsive Breakpoints
    iPhoneXBreakpoint,
    iPhoneSEBreakpoint: 375,

    /** Device sizes */
    // ipads 0.7
    // 480 0.7
    // 670 0.7
    // iphone 5s => 568 0.6
    // iphone 6 => 667 0.6 667 375
    // iphone 6plus => 736 0.6
    // iphone 6s => 667 0.6
    // iphone 6splus => 736 0.6
    // iphone 7 => 667 0.6
    // iphone 7plus, 8plus => 736 0.6
    // iphone se => 568 0.6
    // iphone xs, xr, x, xsmax 812
    screenHeight: width < height ? height : width,
    navBarHeight: Platform.OS === 'ios' ? 64 : 54,
    statusBarHeight: getStatusBarHeight(),
    drawerWidth: width * 0.9,
    buttonRadius: 4,
    icons: {
        tiny: normalizeSpace(12),
        small: normalizeSpace(20),
        medium: normalizeSpace(30),
        large: normalizeSpace(45),
        xl: normalizeSpace(50)
    },
    images: {
        superTiny: normalizeSpace(8),
        tiny: normalizeSpace(15),
        small: normalizeSpace(20),
        medium: normalizeSpace(50),
        large: normalizeSpace(60),
        xLarge: normalizeSpace(80),
        logo: normalizeSpace(200)
    },
    padding: {
        xSmall: normalizeSpace(2),
        small: normalizeSpace(4),
        normal: normalizeSpace(8),
        medium: normalizeSpace(12),
        large: normalizeSpace(16),
        xLarge: normalizeSpace(24),
        xxLarge: normalizeSpace(32),
        xxxLarge: normalizeSpace(48),
        xxxxLarge: normalizeSpace(64),
        // TODO: get rid of the above and use the scale instead everywhere.
        // Also should apply `.map(normalizeSpace)`
        scale: normalizedPaddingScale
    },
    borderRadius: {
        xSmall: normalizeText(2),
        small: normalizeText(4),
        medium: normalizeText(8),
        normal: normalizeText(12),
        large: normalizeText(18),
        xLarge: normalizeText(24),
        // TODO: get rid of the above and use the scale instead everywhere.
        // Also should apply `.map(normalizeText)`
        scale: normalizedBorderRadiusScale
    },
    borderWidth: {
        small: normalizeText(1),
        medium: normalizeText(2),
        large: normalizeText(4)
    },
    buttons: {
        small: normalizeSpace(20),
        medium: normalizeSpace(30),
        normal: normalizeSpace(35),
        large: normalizeSpace(60),
        huge: normalizeSpace(200)
    },
    zIndexes: {
        introOverlay: 10,
        introTooltips: 15
    },

    // helper functions
    evaluateIfIphoneX
}

export default metrics
