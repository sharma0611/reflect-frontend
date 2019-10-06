// @flow
import { getSceneIndicesForInterpolationInputRange } from './utils'
import { Colors } from 'Themes'

export function forVertical(props) {
    const { layout, position, scene } = props

    const interpolate = getSceneIndicesForInterpolationInputRange(props)

    if (!interpolate) return { opacity: 0 }

    const { first, last } = interpolate
    const index = scene.index

    const opacity = position.interpolate({
        inputRange: [first, first + 0.2, index, last - 0.4, last],
        outputRange: [
            0, // card starts transparent
            1, // 20% of the way, it is opaque
            1, // the scene itself is opaque when in place
            1, // about 40% of the way from the top; the background is opaque (transparent)
            0.7 // as we hit the top; we dim the background to 70% opaque (30% black)
        ],
        extrapolate: 'clamp'
    })

    const height = layout.initHeight
    const translateY = position.interpolate({
        inputRange: [first, index, last],
        outputRange: [height, 0, 0],
        extrapolate: 'clamp'
    })
    const translateX = 0

    return {
        opacity,
        transform: [{ translateX }, { translateY }]
    }
}

export const SOLID_BACKGROUND = 'solidBackground'
export function solidBackground(props) {
    const { layout, position, scene } = props
    const interpolate = getSceneIndicesForInterpolationInputRange(props)

    if (!interpolate) return { opacity: 0 }

    const { first, last } = interpolate
    const index = scene.index
    const opacity = position.interpolate({
        inputRange: [first, first + 0.2, index, last - 0.4, last],
        outputRange: [
            0, // card starts transparent
            1, // 20% of the way, it is opaque
            1, // the scene itself is opaque when in place
            1, // about 40% of the way from the top; the background is opaque (transparent)
            1 // as we hit the top; we don't dim the background
        ],
        extrapolate: 'clamp'
    })

    const height = layout.initHeight
    const translateY = position.interpolate({
        inputRange: [first, index, last],
        outputRange: [height, 0, 0],
        extrapolate: 'clamp'
    })
    const translateX = 0

    return {
        opacity,
        transform: [{ translateX }, { translateY }]
    }
}

const SOLID_SCREENS = ['Home', 'Journals', 'Settings']

export function transitionHandler(props) {
    const { scene } = props
    const {
        route: { routeName }
    } = scene
    if (SOLID_SCREENS.includes(routeName)) {
        return solidBackground(props)
    } else {
        return forVertical(props)
    }
}

export const overlayStackProps = {
    mode: 'modal',
    cardStyle: { backgroundColor: 'transparent' },
    transparentCard: true
}

export const modalFriendlyTransition = {
    defaultNavigationOptions: {
        header: null
    },
    ...overlayStackProps,
    transitionConfig: () => ({
        screenInterpolator: transitionHandler,
        containerStyle: {
            //ensures that reducing opacity of a view fades it to black
            backgroundColor: Colors.fmzBlackD
        }
    })
}

export const defaultCardTransition = {
    mode: 'card',
    cardStyle: { backgroundColor: Colors.fmzCardBackground }
}
