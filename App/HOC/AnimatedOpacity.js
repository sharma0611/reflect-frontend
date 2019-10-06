// @flow
import * as React from 'react'
import { Animated, Easing, View } from 'react-native'

const ANIMATION_DURATION = 500

type State = {
    opacity: any,
    interactionEnabled: boolean
}

export const withAnimatedOpacity = (
    WrappedComponent: any,
    initialOpacity: number = 0,
    customAnimatedView: boolean = false
) => {
    class AnimatedOpacity extends React.Component<*, State> {
        state = {
            interactionEnabled: initialOpacity === 1,
            opacity: new Animated.Value(initialOpacity)
        }
        static navigationOptions = WrappedComponent.navigationOptions

        fadeIn = (onComplete: Function, config: any = {}) => {
            return Animated.timing(this.state.opacity, {
                toValue: 1,
                duration: ANIMATION_DURATION,
                easing: Easing.ease,
                ...config
            }).start(() => {
                this.enableInteractive()
                onComplete && onComplete()
            })
        }

        fadeOut = (onComplete: Function, config: any = {}) => {
            this.disableInteractive()
            return Animated.timing(this.state.opacity, {
                toValue: 0,
                duration: ANIMATION_DURATION,
                easing: Easing.ease,
                ...config
            }).start(() => {
                onComplete && onComplete()
            })
        }

        enableInteractive = () => {
            this.setState({ interactionEnabled: true })
        }

        disableInteractive = () => {
            this.setState({ interactionEnabled: false })
        }

        render() {
            return customAnimatedView ? (
                <View
                    style={{ flex: 1 }}
                    pointerEvents={this.state.interactionEnabled ? 'auto' : 'none'}
                >
                    <WrappedComponent
                        {...this.props}
                        opacity={this.state.opacity}
                        fadeIn={this.fadeIn}
                        fadeOut={this.fadeOut}
                    />
                </View>
            ) : (
                <Animated.View
                    style={{ opacity: this.state.opacity, flex: 1 }}
                    pointerEvents={this.state.interactionEnabled ? 'auto' : 'none'}
                >
                    <WrappedComponent {...this.props} fadeIn={this.fadeIn} fadeOut={this.fadeOut} />
                </Animated.View>
            )
        }
    }
    return AnimatedOpacity
}

export default withAnimatedOpacity
