// @flow
import React from 'react'
import { ImageBackground } from 'react-native'
import V from 'Components/V'

class Section extends React.Component<*> {
    render() {
        const { children, bgImg, ...rest } = this.props
        if (bgImg) {
            return (
                <V p={3} pb={0} px={2} flex={1} {...rest}>
                    <ImageBackground source={bgImg} style={{ flex: 1 }}>
                        {children}
                    </ImageBackground>
                </V>
            )
        }
        return (
            <V p={3} pb={0} px={2} {...rest}>
                {children}
            </V>
        )
    }
}

export default Section
