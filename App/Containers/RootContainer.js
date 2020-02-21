/**
 * @flow
 */
import React, { useState, useGlobal, useEffect } from 'reactn'
import { StatusBar, PushNotificationIOS } from 'react-native'
import { createAppContainer } from 'react-navigation'
import createMainNav from './MainNavigation'
import V from 'Components/V'
import T from 'Components/T'
import ErrorBoundary from 'Components/ErrorBoundary'
import PushNotification from 'react-native-push-notification'
import Analytics from 'Controllers/AnalyticsController'
import updateToken from '../Apollo/interface/updateToken'
import legacyLoginUser from '../Apollo/interface/loginUser'
import setDefaultReflectionTime from '../Apollo/interface/setDefaultReflectionTime'
import LoadingSpinner from 'Components/LoadingSpinner'
import Purchases from 'react-native-purchases'
import { AppearanceProvider } from 'react-native-appearance'
import * as Sentry from '@sentry/react-native'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-community/google-signin'

function getActiveRouteName(navigationState) {
    if (!navigationState) {
        return null
    }
    const route = navigationState.routes[navigationState.index]
    // dive into nested navigators
    if (route.routes) {
        return getActiveRouteName(route)
    }
    return route.routeName
}

PushNotification.configure({
    onRegister: token => {
        // LockController.safelyExecute(() => updateToken(token.token))
        updateToken(token.token)
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: notification => {
        // process the notification
        const { userInteraction, title, message } = notification
        if (userInteraction) {
            Analytics.clickedOnPush(title, message)
        } else {
            Analytics.receivedPush()
        }
        // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        notification.finish(PushNotificationIOS.FetchResult.NoData)
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: true
})

const RootContainer = () => {
    const [dataLoading, setDataLoading] = useState(true)
    const [initializing, setInitializing] = useState(true)
    const [hasPro, setHasPro] = useGlobal('hasPro')
    const [user, setUser] = useGlobal('user')

    const setupPurchases = async userId => {
        Purchases.setDebugLogsEnabled(true)
        Purchases.setup('AsrJhdgHqgRWbbrENjMfQrpPAKarCQQb', userId)
        try {
            const purchaserInfo = await Purchases.getPurchaserInfo()
            if (typeof purchaserInfo.entitlements.active.pro !== 'undefined') {
                await setHasPro(true)
            } else {
                await setHasPro(false)
            }
        } catch (e) {
            throw e
            // Error fetching purchaser info
        }
    }

    const onAuthStateChanged = async user => {
        if (user) {
            await setUser(user)
            await setupPurchases(user.uid)
        }
        if (initializing) await setInitializing(false)
    }

    const setupGoogle = async () => {
        await GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '581167811549-ejlhck80ioqmngika3ceeufqalfqu6me.apps.googleusercontent.com' // required
        })
    }

    const bootstrapData = async () => {
        try {
            // online
            const { data } = await legacyLoginUser()
            try {
                let {
                    loginUser: {
                        reflectionPush: { reflectionTimeHour, reflectionTimeMin }
                    }
                } = data
                if (reflectionTimeHour == null) {
                    await setDefaultReflectionTime()
                }
            } catch (e) {
                await setDefaultReflectionTime()
                throw e
            }
            PushNotification.cancelAllLocalNotifications()
            PushNotification.setApplicationIconBadgeNumber(0)
        } catch (e) {
            Sentry.captureException(e)
            // offline
        }
        setDataLoading(false)
    }

    useEffect(async () => {
        await setupGoogle()
        bootstrapData()
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
        return subscriber // unsubscribe on unmount
    }, [])

    const renderAppContainer = loggedIn => {
        const MainNavigation = createMainNav(loggedIn)
        const AppContainer = createAppContainer(MainNavigation)
        return (
            <AppContainer
                onNavigationStateChange={(prevState, currentState, action) => {
                    const currentScreen = getActiveRouteName(currentState)
                    const prevScreen = getActiveRouteName(prevState)

                    if (prevScreen !== currentScreen) {
                        // the line below uses the Google Analytics tracker
                        // change the tracker here to use other Mobile analytics SDK.
                        Analytics.viewScreen(currentScreen)
                    }
                }}
            />
        )
    }

    if (dataLoading || initializing) {
        return <LoadingSpinner />
    }

    return (
        <ErrorBoundary>
            <AppearanceProvider>
                <V flex={1} bg="WhiteM">
                    <StatusBar barStyle="dark-content" />
                    {renderAppContainer(!!user)}
                </V>
            </AppearanceProvider>
        </ErrorBoundary>
    )
}

export default RootContainer
