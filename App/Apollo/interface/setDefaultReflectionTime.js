import setDefaultReflectionTimeMutation from 'Apollo/mutations/setDefaultReflectionTimeMutation'
import { localToUtcTime } from 'utils'
import { defaultReflectionHour, defaultReflectionMin } from 'Config/Defaults'
import AppConfig from 'Config/AppConfig'

const setDefaultReflectionTime = () => {
    const { hours: defaultReflectionTimeHour, minutes: defaultReflectionTimeMin } = localToUtcTime(
        defaultReflectionHour,
        defaultReflectionMin
    )
    return setDefaultReflectionTimeMutation(
        AppConfig.DEVICE_ID,
        defaultReflectionTimeHour,
        defaultReflectionTimeMin
    )
}

export default setDefaultReflectionTime
