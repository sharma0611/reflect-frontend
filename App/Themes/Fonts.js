import normalizeText from './Utils/normalizeText'
import normalize from './Utils/normalizeText'

// @important, we need a different font for Android.

// SourceSansPro-Bold.ttf
// SourceSansPro-Italic.ttf
// SourceSansPro-Light.ttf
// SourceSansPro-Regular.ttf
// SourceSansPro-SemiBold.ttf
// SourceSansPro-SemiBoldItalic.ttf
const type = {
    base: 'Avenir-Book',
    title: 'Avenir-Medium',
    thinTitle: 'Avenir-Book',
    bold: 'Avenir-Heavy',
    emphasis: 'Ubuntu'
}

const size = {
    titleXL: normalizeText(32),
    titleL: normalizeText(27),
    titleM: normalizeText(24),
    titleS: normalizeText(20),
    titleXS: normalizeText(16),
    heading: normalizeText(20),
    body: normalizeText(15),
    chat: normalizeText(14),
    subHeading: normalizeText(13),
    caption: normalizeText(13),
    tiny: normalizeText(11),
    baby: normalizeText(9)
}

const lineHeight = {
    chat: normalizeText(18)
}
const weights = {
    title: '700',
    subheading: '400',
    normal: '400'
}

const style = {
    //new
    heading1: {
        fontFamily: type.base,
        fontSize: normalizeText(64),
        fontWeight: '300'
    },
    heading2: {
        fontFamily: type.base,
        fontSize: normalizeText(48),
        fontWeight: '300'
    },
    heading3: {
        fontFamily: type.title,
        fontSize: normalizeText(36)
        // fontWeight: '500'
    },
    heading4: {
        fontFamily: type.title,
        fontSize: normalizeText(24)
        // fontWeight: '500'
    },
    heading5: {
        fontFamily: type.bold,
        fontSize: normalizeText(18)
        // fontWeight: '500'
    },
    subtitle1: {
        fontFamily: type.thinTitle,
        fontSize: normalizeText(16),
        letterSpacing: 1.5
    },
    subtitle2: {
        fontFamily: type.thinTitle,
        fontSize: normalizeText(14),
        letterSpacing: 0.1,
        fontWeight: '500'
    },
    body1: {
        fontFamily: type.base,
        fontSize: normalizeText(16)
    },
    body2: {
        fontFamily: type.base,
        fontSize: normalizeText(14),
        fontWeight: '500'
    },
    body3: {
        fontFamily: type.base,
        fontSize: normalizeText(18)
    },
    button: {
        fontFamily: type.title,
        fontWeight: '500',
        fontSize: normalizeText(14),
        letterSpacing: 0.5,
        textTransform: 'uppercase'
    },
    caption: {
        fontFamily: type.base,
        fontSize: normalizeText(12)
    },
    //legacy
    titleXL: {
        fontFamily: type.title,
        fontWeight: 'normal',
        fontSize: size.titleXL
    },
    titleL: {
        fontFamily: type.title,
        fontSize: size.titleL
    },
    titleM: {
        fontFamily: type.title,
        fontWeight: 'normal',
        fontSize: size.titleM
    },
    titleS: {
        fontFamily: type.title,
        fontWeight: 'normal',
        fontSize: size.titleS
    },
    titleXS: {
        fontFamily: type.title,
        fontWeight: 'normal',
        fontSize: size.titleXS
    },
    heading: {
        fontFamily: type.base,
        fontWeight: 'normal',
        fontSize: size.heading
    },
    subHeading: {
        fontFamily: type.base,
        fontWeight: 'normal',
        fontSize: size.subHeading
    },
    body: {
        fontFamily: type.base,
        fontWeight: 'normal',
        fontSize: size.body
    },
    chat: {
        fontFamily: type.base,
        fontWeight: 'normal',
        fontSize: size.chat
    },
    thinSubHeading: {
        fontFamily: type.base,
        fontWeight: '400',
        fontSize: size.caption
    },
    tiny: {
        fontFamily: type.base,
        fontWeight: '400',
        fontSize: size.tiny
    },
    baby: {
        fontFamily: type.base,
        fontWeight: '500',
        fontSize: size.baby
    },
    strong: {
        fontFamily: type.base,
        fontWeight: 'bold'
    },
    thin: {
        fontFamily: type.base,
        fontWeight: '200'
    },
    italics: {
        fontStyle: 'italic'
    },
    emphasis: {
        fontFamily: type.emphasis,
        fontWeight: '400'
    },
    thinTitle: {
        fontFamily: type.thinTitle,
        fontWeight: '300'
    }
}

export default {
    type,
    size,
    lineHeight,
    style,
    weights
}
