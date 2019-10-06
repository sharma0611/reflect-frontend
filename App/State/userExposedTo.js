// @flow
import { Container } from 'unstated'
import moment from 'moment'
import get from 'lodash/get'
import type Moment from 'moment'
import AsyncStorageController from 'Controllers/AsyncStorageController'
import type { BootstrapableContainer } from './bootstrapableContainer'
import Analytics from 'Controllers/AnalyticsController'

export type UserExposedToStateType = {
    onboardingCompleted: boolean,
    loaded: boolean,
    hasPro: boolean
}

// helper function
function currentDate(): Moment {
    return moment(new Date())
}

const ASYNC_STORAGE_KEY = 'USER_EXPOSED_TO_STATE'

const INITIAL_VALUES = {
    onboardingCompleted: false,
    loaded: false
}

export class UserExposedToContainer extends Container<UserExposedToStateType>
    implements BootstrapableContainer {
    state = {
        ...INITIAL_VALUES
        // other features goes here
    }

    bootstrapData = async data => {
        await this.loadAsyncStorageState()
        await this.setState({ loaded: true })
    }

    // sync with async storage
    loadAsyncStorageState = async () => {
        const persistedState = await AsyncStorageController.getItem(ASYNC_STORAGE_KEY)
        if (persistedState) {
            return this.setState(persistedState)
        }
    }

    // persist to async storage
    _persist = () => {
        AsyncStorageController.setItem(ASYNC_STORAGE_KEY, this.state)
    }

    // for booleans
    _onExposedTo = async (key: string) => {
        await this.setState({ [key]: true })
        this._persist()
    }
    _onUnexposedTo = async (key: string) => {
        await this.setState({ [key]: false })
        this._persist()
    }

    // for incrementors
    _onExposedToIncrementNum = async (key: string) => {
        const new_val = this.state[key] + 1
        await this.setState({ [key]: new_val })
        this._persist()
    }

    _resetExposedNum = async (key: string) => {
        await this.setState({ [key]: 0 })
        this._persist()
    }

    _resetExposed = async (key: string) => {
        await this.setState({ [key]: INITIAL_VALUES[key] })
        this._persist()
    }

    // for dates
    _onExposedToToday = async (key: string) => {
        // called when you want to reset the date last seen
        const today = currentDate()
        await this.setState({ [key]: today })
        this._persist()
    }

    _hasBeenExposedToToday = (key: string) => {
        const lastExposedToDate = this.state[key]
        const today = currentDate()
        return today.isSame(lastExposedToDate, 'day')
    }

    // publicly available fns
    onExposedToOnboarding = () => this._onExposedTo('onboardingCompleted')

    unlockPro = () => {
        this._onExposedTo('hasPro')
        Analytics.unlockPro()
    }
    lockPro = () => {
        this._onUnexposedTo('hasPro')
        Analytics.lockPro()
    }
}

const container = new UserExposedToContainer()

export default container
