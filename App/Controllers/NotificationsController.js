// @flow
import messaging from '@react-native-firebase/messaging'

export const registerAppWithFCM = async (): Promise<void> => {
    if (__DEV__) {
        const fcmToken = await messaging().getToken()
        console.log('Notification FCM Token:', fcmToken)
    }
    await messaging().registerDeviceForRemoteMessages()
}

export const requestUserPermission = async (): Promise<void> => {
    const settings = await messaging().requestPermission()

    if (__DEV__) {
        console.log('Notification permission settings:', settings)
    }
}
