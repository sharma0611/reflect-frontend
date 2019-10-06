import updateTokenMutation from 'Apollo/mutations/updateTokenMutation'
import AppConfig from 'Config/AppConfig'

const updateToken = token => {
    return updateTokenMutation(AppConfig.DEVICE_ID, token)
}

export default updateToken
