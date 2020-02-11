import updateTokenMutation from 'Apollo/mutations/updateTokenMutation'
import AppConfig from 'Config/AppConfig'

const updateToken = async token => {
    const deviceId = await AppConfig.getDeviceId()
    return updateTokenMutation(deviceId, token)
}

export default updateToken
