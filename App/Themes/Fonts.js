import normalizeText from './Utils/normalizeText'

// @important, we need a different font for Android.

// SourceSansPro-Bold.ttf
// SourceSansPro-Italic.ttf
// SourceSansPro-Light.ttf
// SourceSansPro-Regular.ttf
// SourceSansPro-SemiBold.ttf
// SourceSansPro-SemiBoldItalic.ttf
const type = {
    base: 'Bariol-Regular',
    title: 'Avenir-Medium',
    thinTitle: 'Avenir-Book',
    bold: 'System',
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
    caption: {
        fontFamily: type.base,
        fontWeight: 'normal',
        fontSize: size.caption
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
    }
}

export default {
    type,
    size,
    lineHeight,
    style,
    weights
}
