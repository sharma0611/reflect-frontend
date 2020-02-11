/**
 * @flow
 * General text component
 *
 * Examples
 * <T titleL mb={5}>Pants!</T>
 * <T body px={10}>More pants..</T>
 */
import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { Colors, Fonts } from 'Themes'
import space from 'Components/utils/space'

type Props = {
    children: React.Node,
    titleXL?: boolean,
    titleL?: boolean,
    titleM?: boolean,
    titleS?: boolean,
    titleXS?: boolean,
    heading?: boolean,
    subHeading?: boolean,
    thinSubHeading?: boolean,
    body?: boolean,
    body3?: boolean,
    chat?: boolean,
    caption?: boolean,
    tiny?: boolean,
    baby?: boolean,
    strong?: boolean,
    thin?: boolean,
    center?: boolean,
    it?: boolean,
    color?: string,
    bg?: string,
    link?: boolean,
    ta?: string,
    style?: any,
    overrideStyle?: any,
    flex?: number
}

const T = ({
    children,
    //new
    subtitle1,
    subtitle2,
    heading1,
    heading2,
    heading3,
    heading4,
    button,
    //legacy
    titleXL,
    titleL,
    titleM,
    titleS,
    titleXS,
    body3,
    heading,
    subHeading,
    thinSubHeading,
    body,
    chat,
    caption,
    baby,
    tiny,
    strong,
    thin,
    it,
    color,
    bg,
    link,
    center,
    ta,
    style,
    flex,
    as,
    emphasis,
    thinTitle,
    overrideStyle, // TO DO: figure out if style is what we want here instead... it breaks a snapshot test though so check that out too
    ...rest
}: Props) => {
    const _style = [
        styles.base,
        style && style,
        flex && { flex },
        //new
        subtitle1 && Fonts.style.subtitle1,
        subtitle2 && Fonts.style.subtitle2,
        heading1 && Fonts.style.heading1,
        heading2 && Fonts.style.heading2,
        heading3 && Fonts.style.heading3,
        heading4 && Fonts.style.heading4,
        button && Fonts.style.button,
        //legacy
        titleXL && Fonts.style.titleXL,
        titleL && Fonts.style.titleL,
        titleM && Fonts.style.titleM,
        titleS && Fonts.style.titleS,
        titleXS && Fonts.style.titleXS,
        body3 && Fonts.style.body3,
        heading && Fonts.style.heading,
        subHeading && Fonts.style.subHeading,
        thinSubHeading && Fonts.style.thinSubHeading,
        as && { alignSelf: as },
        body && Fonts.style.body,
        chat && Fonts.style.chat,
        tiny && Fonts.style.tiny,
        baby && Fonts.style.baby,
        caption && Fonts.style.caption,
        it && Fonts.style.italics,
        thin && Fonts.style.thin,
        color && { color: Colors.getColor(color) },
        bg && { backgroundColor: Colors.getColor(bg) },
        link && styles.link,
        ta && { textAlign: ta },
        emphasis && Fonts.style.emphasis,
        thinTitle && Fonts.style.thinTitle,
        strong && Fonts.style.strong,
        space(rest),
        overrideStyle && overrideStyle
    ]
    return (
        <Text style={_style} {...rest}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    base: {
        ...Fonts.style.body,
        color: Colors.fmzBlackM
    },
    link: {
        ...Fonts.style.caption,
        color: Colors.BrandM,
        fontWeight: 'bold'
    }
})

export default T
