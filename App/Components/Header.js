// @flow
import React from 'react'
import { StyleSheet, Animated } from 'react-native'
import { AppStyles, Metrics, Colors, Images } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import { withNavigation } from 'react-navigation'
import PressableImage from 'Components/PressableImage'

type Props = {
    title?: string,
    navigation: any
}

type State = {}

class Header extends React.Component<Props, State> {
    render() {
        const { title, white, onClose, animatedColor, ...rest } = this.props
        const titleColor = white ? 'WhiteM' : 'GreyL'

        let C = animatedColor ? Animated.View : V

        return (
            <V row pabs p={1} style={{ width: Metrics.screenWidth }} jc="flex-end">
                {!!title && (
                    <V pabs pt={3} pl={3} style={styles.headerWrapper}>
                        <C
                            style={[
                                styles.headerBackground,
                                animatedColor && { backgroundColor: animatedColor }
                            ]}
                            {...rest}
                        />
                        <V style={AppStyles.bringToFront}>
                            <T titleS thinTitle color={titleColor}>
                                {title}
                            </T>
                        </V>
                    </V>
                )}
                <V style={AppStyles.bringToFront}>
                    <PressableImage
                        source={Images.exit}
                        style={[styles.exit, white && { tintColor: Colors.WhiteM }]}
                        onPress={() => {
                            onClose ? onClose() : this.props.navigation.navigate('Tabs')
                        }}
                    />
                </V>
            </V>
        )
    }
}

export const HEADER_HEIGHT = 60

const styles = StyleSheet.create({
    exit: {
        width: 15,
        height: 15,
        margin: 20,
        tintColor: Colors.GreyD
    },
    headerWrapper: {
        width: Metrics.screenWidth,
        height: HEADER_HEIGHT
    },
    headerBackground: {
        width: Metrics.screenWidth,
        height: HEADER_HEIGHT,
        position: 'absolute',
        backgroundColor: Colors.WhiteM,
        ...AppStyles.dropShadow.normal,
        shadowOpacity: 0.17
    }
})

export default withNavigation(Header)
