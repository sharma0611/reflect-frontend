/**
 * @flow
 */
import React, { Component } from 'react'
import { StatusBar, PushNotificationIOS } from 'react-native'
import { createAppContainer } from 'react-navigation'
import createMainNav from './MainNavigation'
import V from 'Components/V'
import PushNotification from 'react-native-push-notification'
import Analytics from 'Controllers/AnalyticsController'
import updateToken from '../Apollo/interface/updateToken'
import loginUser from '../Apollo/interface/loginUser'
import setDefaultReflectionTime from '../Apollo/interface/setDefaultReflectionTime'
// import LockController from 'Controllers/LockController'
import withState from 'State'
import { bootstrapData } from 'State/bootstrapableContainer'
import LoadingSpinner from 'Components/LoadingSpinner'
import Purchases from 'react-native-purchases'
import AppConfig from 'Config/AppConfig'
import userExposedToContainer from 'State/userExposedTo'
import { AppearanceProvider } from 'react-native-appearance'

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

class RootContainer extends Component {
    state = {
        loaded: false
    }
    bootstrapData = async () => {
        await bootstrapData()
        try {
            // online
            const { data } = await loginUser()
            let {
                loginUser: {
                    userUuid,
                    reflectionPush: { reflectionTimeHour, reflectionTimeMin }
                }
            } = data
            if (reflectionTimeHour == null) {
                await setDefaultReflectionTime()
            }
            PushNotification.cancelAllLocalNotifications()
            PushNotification.setApplicationIconBadgeNumber(0)
            Purchases.setDebugLogsEnabled(true)
            Purchases.setup('AsrJhdgHqgRWbbrENjMfQrpPAKarCQQb', userUuid)
            try {
                const purchaserInfo = await Purchases.getPurchaserInfo()
                if (typeof purchaserInfo.entitlements.active.pro !== 'undefined') {
                    userExposedToContainer.unlockPro()
                } else {
                    userExposedToContainer.lockPro()
                }
            } catch (e) {
                // Error fetching purchaser info
            }
        } catch {
            // offline
        }
        this.setState({ loaded: true })
    }

    componentDidMount() {
        this.bootstrapData()
    }

    renderAppContainer = () => {
        const MainNavigation = createMainNav(this.props.onboardingCompleted)
        const AppContainer = createAppContainer(MainNavigation)
        return (
            <AppContainer
                onNavigationStateChange={(prevState, currentState, action) => {
                    const currentScreen = getActiveRouteName(currentState)
                    const prevScreen = getActiveRouteName(prevState)

                    if (prevScreen !== currentScreen) {
                        // the line below uses the Google Analytics tracker
                        // change the tracker here to use other Mobile analytics SDK.
                        // Analytics.viewScreen(currentScreen)
                    }
                }}
            />
        )
    }

    render() {
        return (
            <AppearanceProvider>
                <V flex={1} bg="WhiteM">
                    <StatusBar barStyle="dark-content" />
                    {this.state.loaded && this.props.loaded ? (
                        this.renderAppContainer()
                    ) : (
                        <LoadingSpinner />
                    )}
                </V>
            </AppearanceProvider>
        )
    }
}

export default withState(RootContainer, 'userExposedTo')
