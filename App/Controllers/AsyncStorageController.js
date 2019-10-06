// @flow
import AsyncStorage from '@react-native-community/async-storage'

const NAME = 'NAME'

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
}

export default new AsyncStorageController()
