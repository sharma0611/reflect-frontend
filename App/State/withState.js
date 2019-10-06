// @flow
/**
 * Add state to your components!
 *
 * Example:
 *
 * export default withState(MyAwesomeComponent, ['userExposedTo', 'otherStateComponent'])
 */
import * as React from 'react'
import { Subscribe } from 'unstated'
import invariant from 'invariant'
import isArray from 'lodash/isArray'
import { stateContainers } from './'

const withState = (Component, stateContainerKeys: Array<string> | string) => {
    class WithStateWrapperNew extends React.Component {
        render() {
            if (!isArray(stateContainerKeys)) {
                stateContainerKeys = [stateContainerKeys]
            }

            stateContainerKeys.forEach(key =>
                invariant(stateContainers[key], 'Illegal state container 😭 ')
            )

            const mappedContainers = stateContainerKeys.map(key => stateContainers[key])
            return (
                <Subscribe to={mappedContainers}>
                    {(...states) => {
                        const mappedState = stateContainerKeys
                            .map((key, i) => ({
                                ...states[i].state
                            }))
                            .reduce((all, curr) => ({ ...all, ...curr }), {})

                        return <Component {...this.props} {...mappedState} />
                    }}
                </Subscribe>
            )
        }
    }

    return WithStateWrapperNew
}

export default withState
