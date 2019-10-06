// @flow
import { stateContainers } from './index'

// stateContainer that gets initial graphql data
export interface BootstrapableContainer {
    bootstrapData(props: any): Promise<any>;
}

export const bootstrapData = (data: any): Promise<any> => {
    const promises: array<Promise> = Object.keys(stateContainers)
        .filter(key => {
            return typeof stateContainers[key].bootstrapData === 'function'
        })
        .map(key => {
            return stateContainers[key].bootstrapData(data)
        })

    return Promise.all(promises)
}
