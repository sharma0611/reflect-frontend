// @flow
import React from 'react'
import V from 'Components/V'
import { AppStyles } from 'Themes'
import { ImageBackground } from 'react-native'

const BackgroundImageHOC = (children, bgImg, bgImgStyle) => {
    return (
        <ImageBackground source={bgImg} style={{ flex: 1 }} imageStyle={bgImgStyle}>
            {children}
        </ImageBackground>
    )
}

const BaseScreen = props => {
    const { children, ...rest } = props
    return (
        <V style={AppStyles.mainContainer} {...rest}>
            {children}
        </V>
    )
}

class Screen extends React.Component<*> {
    render() {
        const { children, bgImg, bgImgStyle, ...rest } = this.props
        let ScreenNode = BaseScreen(this.props)
        if (bgImg) {
            ScreenNode = BackgroundImageHOC(ScreenNode, bgImg, bgImgStyle)
        }
        return ScreenNode
    }
}

export default Screen
