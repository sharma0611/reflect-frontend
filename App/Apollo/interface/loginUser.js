import loginUserMutation from 'Apollo/mutations/loginUserMutation'
import AppConfig from 'Config/AppConfig'

const loginUser = async () => {
    const deviceId = await AppConfig.getDeviceId()
    return loginUserMutation(deviceId)
}

export default loginUser
