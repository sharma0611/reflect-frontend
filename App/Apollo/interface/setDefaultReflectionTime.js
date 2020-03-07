import setDefaultReflectionTimeMutation from 'Apollo/mutations/setDefaultReflectionTimeMutation'
import { localToUtcTime } from 'utils'
import { defaultReflectionHour, defaultReflectionMin } from 'Config/Defaults'
import AppConfig from 'Config/AppConfig'

const setDefaultReflectionTime = async () => {
    const { hours: defaultReflectionTimeHour, minutes: defaultReflectionTimeMin } = localToUtcTime(
        defaultReflectionHour,
        defaultReflectionMin
    )
    const deviceId = await AppConfig.getDeviceId()
    return setDefaultReflectionTimeMutation(
        deviceId,
        defaultReflectionTimeHour,
        defaultReflectionTimeMin
    )
}

export default setDefaultReflectionTime
