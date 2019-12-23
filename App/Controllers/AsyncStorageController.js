// @flow
import AsyncStorage from '@react-native-community/async-storage'

const NAME = 'NAME'
const DAILY_SKIPS = 'DAILY_SKIPS'
const DAILY_SKIPS_LAST_SEEN = 'DAILY_SKIPS_LAST_SEEN'
const GOAL_CATEGORY_INDEX = '_GOAL_CATEGORY_INDEX'

const NUM_DAILY_SKIPS = 5
const INITIAL_CARD_INDEX = 1

class AsyncStorageController {
    clear = async () => {
        await AsyncStorage.clear()
    }

    getItem = async (key: string) => {
        const value = await AsyncStorage.getItem(key)
        if (!value) return null
        return JSON.parse(value)
    }

    setItem = async (key: string, value: any) => {
        const serializedValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, serializedValue)
    }

    getName = async () => {
        const name = await this.getItem(NAME)
        return name
    }

    setName = async (name: string) => {
        await this.setItem(NAME, name)
    }

    getDailySkips = async () => {
        const currentDate = new Date().toISOString().substring(0, 10)
        const lastSeen = await this.getItem(DAILY_SKIPS_LAST_SEEN)
        let dailySkips
        if (lastSeen !== currentDate.toString()) {
            await this.setItem(DAILY_SKIPS_LAST_SEEN, currentDate)
            await this.setItem(DAILY_SKIPS, NUM_DAILY_SKIPS)
            dailySkips = NUM_DAILY_SKIPS
        } else {
            dailySkips = await this.getItem(DAILY_SKIPS)
        }
        return dailySkips
    }

    getCardIndex = async category => {
        const categoryKey = category + GOAL_CATEGORY_INDEX
        const cardIndex = await this.getItem(categoryKey)
        if (cardIndex) {
            return cardIndex
        } else {
            return INITIAL_CARD_INDEX
        }
    }

    setCardIndex = async (category, cardIndex) => {
        const categoryKey = category + GOAL_CATEGORY_INDEX
        await this.setItem(categoryKey, cardIndex)
    }

    decrementDailySkips = async () => {
        const currentDate = new Date().toISOString().substring(0, 10)
        const dailySkips = await this.getItem(DAILY_SKIPS)
        await this.setItem(DAILY_SKIPS_LAST_SEEN, currentDate)
        await this.setItem(DAILY_SKIPS, dailySkips - 1)
        return dailySkips - 1
    }
}

export default new AsyncStorageController()
