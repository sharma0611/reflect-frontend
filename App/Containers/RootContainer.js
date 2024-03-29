/**
 * @flow
 */
import React, { useState, useEffect } from 'react'
import { StatusBar, Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import createMainNav from './MainNavigation'
import V from 'Components/V'
import ErrorBoundary from 'Components/ErrorBoundary'
import PushNotification from 'react-native-push-notification'
import Analytics from 'Controllers/AnalyticsController'
import updateToken from '../Apollo/interface/updateToken'
import legacyLoginUser from '../Apollo/interface/loginUser'
import setDefaultReflectionTime from '../Apollo/interface/setDefaultReflectionTime'
import { AppearanceProvider } from 'react-native-appearance'
import * as Sentry from '@sentry/react-native'
import { GoogleSignin } from '@react-native-community/google-signin'
import PushNotificationIOS from '@react-native-community/push-notification-ios'

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
        if (Platform.OS === 'ios') {
            notification.finish(PushNotificationIOS.FetchResult.NoData)
        }
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

function RootContainer() {
    const [dataLoading, setDataLoading] = useState(true)

    const setupGoogle = async () => {
        await GoogleSignin.configure({
            webClientId: '581167811549-ejlhck80ioqmngika3ceeufqalfqu6me.apps.googleusercontent.com' // required
            //com.googleusercontent.apps.581167811549-2qi5ih06ub4s3ndkbhbfl4n5gcsjp04k
            //581167811549-2qi5ih06ub4s3ndkbhbfl4n5gcsjp04k.apps.googleusercontent.com
        })
    }

    const bootstrapData = async () => {
        try {
            // online
            PushNotification.cancelAllLocalNotifications()
            PushNotification.setApplicationIconBadgeNumber(0)
            await setupGoogle()
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
        } catch (e) {
            Sentry.captureException(e)
            // offline
        }
        setDataLoading(false)
    }

    useEffect(() => {
        bootstrapData()
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

    return (
        <ErrorBoundary>
            <AppearanceProvider>
                <V flex={1} bg="WhiteM">
                    <StatusBar barStyle="dark-content" />
                    {renderAppContainer()}
                </V>
            </AppearanceProvider>
        </ErrorBoundary>
    )
}

export default RootContainer
