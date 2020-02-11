import DeviceInfo from 'react-native-device-info'

/**
 *
 * Use __DEV__toggle below if you don't want this value to change
 * when you point the simulator to production
 *
 * */
const isDev = !__DEV__

class AppConfig {
    constructor() {
        this.loadData()
    }

    loadData = async () => {
        this.isDev = isDev
        this.API_BASE_URI = isDev ? 'http://localhost:3000' : 'https://reflect-prod.herokuapp.com'
        this.MIXPANEL_TOKEN = __DEV__
            ? 'f805f0f62899e4e49f30e1e3cfd63b1d'
            : 'd9d9e94c3a3efcca73d5edd39156d1a0'
        this.APP_VERSION = __DEV__ ? 'DEV' : await DeviceInfo.getVersion()
        this.BUILD_VERSION = __DEV__ ? 'DEV' : await DeviceInfo.getBuildNumber()
        this.BUNDLE_IDENTIFIER = __DEV__ ? 'DEV' : DeviceInfo.getBundleId()
        this.DEVICE_ID = __DEV__ ? 'DEV' : await DeviceInfo.getUniqueId()
    }

    getDeviceId = () => {
        return DeviceInfo.getUniqueId()
    }
}

const config = new AppConfig()

export default config

// export default {
//     isDev,
//     API_BASE_URI: isDev ? 'http://localhost:3000' : 'https://reflect-prod.herokuapp.com',
//     MIXPANEL_TOKEN: __DEV__
//         ? 'f805f0f62899e4e49f30e1e3cfd63b1d'
//         : 'd9d9e94c3a3efcca73d5edd39156d1a0',
//     APP_VERSION: __DEV__ ? 'DEV' : DeviceInfo.getVersion(),
//     BUILD_VERSION: __DEV__ ? 'DEV' : DeviceInfo.getBuildNumber(),
//     BUNDLE_IDENTIFIER: __DEV__ ? 'DEV' : DeviceInfo.getBundleId(),
//     DEVICE_ID: __DEV__ ? 'DEV' : DeviceInfo.getUniqueId()
// }
