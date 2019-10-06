import loginUserMutation from 'Apollo/mutations/loginUserMutation'
import AppConfig from 'Config/AppConfig'

const loginUser = () => {
    return loginUserMutation(AppConfig.DEVICE_ID)
}

export default loginUser
