// @flow
// This function is a util used by React-Navigation to safely retreive the correct scene indices for scenes on the stack.
// It can be found @ node_modules/react-navigation-stack/dist/utils getSceneIndicesForInterpolationInputRange.js
// Or at https://github.com/react-navigation/react-navigation-stack/blob/master/src/utils/getSceneIndicesForInterpolationInputRange.js
import isNumber from 'lodash/isNumber'

export function getSceneIndicesForInterpolationInputRange(props) {
    const { scene, scenes } = props
    const index = scene.index
    const lastSceneIndexInScenes = scenes.length - 1
    const isBack = !scenes[lastSceneIndexInScenes].isActive

    if (isBack) {
        const currentSceneIndexInScenes = scenes.findIndex(item => item === scene)
        const targetSceneIndexInScenes = scenes.findIndex(item => item.isActive)
        const targetSceneIndex = scenes[targetSceneIndexInScenes].index
        const lastSceneIndex = scenes[lastSceneIndexInScenes].index

        if (index !== targetSceneIndex && currentSceneIndexInScenes === lastSceneIndexInScenes) {
            return {
                first: Math.min(targetSceneIndex, index - 1),
                last: index + 1
            }
        } else if (
            index === targetSceneIndex &&
            currentSceneIndexInScenes === targetSceneIndexInScenes
        ) {
            return {
                first: index - 1,
                last: Math.max(lastSceneIndex, index + 1)
            }
        } else if (
            index === targetSceneIndex ||
            currentSceneIndexInScenes > targetSceneIndexInScenes
        ) {
            return null
        } else {
            return { first: index - 1, last: index + 1 }
        }
    } else {
        return { first: index - 1, last: index + 1 }
    }
}

export const getCurrentRoute = (state: Object) => {
    const findCurrentRoute = (navState: Object) => {
        if (isNumber(navState.index)) {
            return findCurrentRoute(navState.routes[navState.index])
        }
        return navState.routeName
    }
    return findCurrentRoute(state)
}

export const formatDate = (date: Date) => {
    let m = date.getMonth() + 1
    m = m.toString().padStart(2, '0')
    const d = date
        .getDate()
        .toString()
        .padStart(2, '0')
    const y = date
        .getFullYear()
        .toString()
        .slice(2, 4)

    return `${m}/${d}/${y}`
}
