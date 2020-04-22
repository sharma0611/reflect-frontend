// @flow
import { Platform } from 'react-native'
import Mixpanel from 'react-native-mixpanel'
import { AppEventsLogger } from 'react-native-fbsdk'
import config from 'Config/AppConfig'
import moment from 'moment'
import firebaseAnalytics from '@react-native-firebase/analytics'
import snakeCase from 'lodash-es/snakeCase'
import mapKeys from 'lodash-es/mapKeys'
import isPlainObject from 'lodash-es/isPlainObject'
import toString from 'lodash-es/toString'

class Tracking {
    constructor() {
        Mixpanel.sharedInstanceWithToken(config.MIXPANEL_TOKEN)
        // .then(
        // () =>
        //     Mixpanel.identify(config.getDeviceId())
        // )
    }
    // Send and event name with no properties
    _track = (eventName: string, logToFirebase = true) => {
        Mixpanel.track(eventName)
        AppEventsLogger.logEvent(eventName)
        if (logToFirebase) this.logEvent(eventName)
    }

    // Track event with properties
    _trackWithProperties = (eventName: string, props: any, logToFirebase = true) => {
        Mixpanel.trackWithProperties(eventName, props)
        AppEventsLogger.logEvent(eventName, null, props)
        if (logToFirebase) this.logEvent(eventName, props)
    }

    // set people properties
    // You should pass in any props with spacing, e.g:
    // { ['Has Robo']: true }
    _set = (props: any) => {
        Mixpanel.set(props)
        this.setUserProperties(props)
    }

    //Set the email people propertiy Once
    _setOnce = (email: string) => {
        Mixpanel.setOnce({ $email: email, Created: new Date().toISOString() })
    }

    _registerSuperProperties = (props: any) => {
        Mixpanel.registerSuperProperties(props)
    }

    _increment = (eventName: string, value: number) => {
        Mixpanel.increment(eventName, value)
    }

    _identify = (identity: string) => {
        Mixpanel.identify(identity)
    }

    _alias = (identity: string) => {
        Mixpanel.createAlias(identity)
    }

    identifyByUid = (uid: string, method?: string = 'undefined') => {
        this._identify(uid)
        this.setUserId(uid)
        firebaseAnalytics().logLogin({ method })
    }

    aliasByUid = (uid: string, method?: string = 'undefined') => {
        this._alias(uid)
        this.setUserId(uid)
        firebaseAnalytics().logSignUp({ method })
    }

    viewScreen = (screenName: string) => {
        this._track('View ' + screenName, false)
        // console.log('viewScreen', screenName)
        firebaseAnalytics().setCurrentScreen(screenName, screenName)
    }

    saveJournal = (journalType: string, journalLength: number, title: string) => {
        this._trackWithProperties('Save Journal', {
            'Journal Type': journalType,
            'Journal Length': journalLength,
            Title: title
        })
    }

    saveDailyMood = (mood: string) => {
        this._trackWithProperties('Save Daily Mood', { mood })
    }

    updateJournal = () => {
        this._track('Update Journal')
    }

    deleteJournal = () => {
        this._track('Delete Journal')
    }

    openDailyReflection = () => {
        this._track('Open Daily Reflection')
    }

    openJournalCategory = category => {
        this._trackWithProperties('Open Category', { category })
    }

    openGoalCategory = category => {
        this._trackWithProperties('Open Goal Category', { category })
    }

    selectMonthlySubscription = () => {
        this._track('Select monthly subscription')
    }

    selectAnnualSubscription = () => {
        this._track('Select annual subscription')
    }

    openWebView = (url: string) => {
        this._trackWithProperties('Open WebView', { url })
    }

    openShare = () => {
        this._track('Open share')
    }

    hasShared = () => {
        this._track('App shared')
    }

    receivedPush = () => {
        this._track('Received push')
    }

    clickedOnPush = (pushTitle, pushMessage) => {
        this._trackWithProperties('Clicked on push', {
            'Push Title': pushTitle,
            'Push Message': pushMessage
        })
    }

    pressCreatePin = () => {
        this._track('Press create pin')
    }

    setDailyReflectionReminder = () => {
        this._track('Set daily reflection time')
    }

    saveDailyGoal = text => {
        this._trackWithProperties('Save daily goal', { text })
    }

    updateDailyGoal = (_id, length, text) => {
        this._trackWithProperties('Update daily goal', { _id, Length: length, text })
    }

    pressDailyReflection = date => {
        const a = moment(date)
        const b = moment()
        const daysAgo = b.diff(a, 'days')
        this._trackWithProperties('Press Daily Reflection', { 'Days Ago': daysAgo })
    }

    openDailyGoalsScreen = () => {
        this._track('Open Daily Goals Screen')
    }

    pressDailyGoals = date => {
        const a = moment(date)
        const b = moment()
        const daysAgo = b.diff(a, 'days')
        this._trackWithProperties('Press Daily Goals', { 'Days Ago': daysAgo })
    }

    pressOnboardingNext = content => {
        this._trackWithProperties('Press onboarding next', { Content: content })
    }

    submitAge = age => {
        this._trackWithProperties('Submit Age', { Age: age })
        this._set({ Age: age })
    }

    submitGender = gender => {
        this._trackWithProperties('Submit Gender', { Gender: gender })
        this._set({ Gender: gender })
    }

    submitFeels = wantToFeel => {
        this._trackWithProperties('Submit Want To Feel', { Feel: wantToFeel })
    }

    submitLifeGoals = lifeGoals => {
        this._trackWithProperties('Submit Life Goals', { Goals: lifeGoals })
    }

    unlockPro() {
        this._track('Unlock Pro')
    }

    lockPro() {
        this._track('Lock Pro')
    }

    // mellow

    signIn(method: string) {
        this._trackWithProperties('Sign In', { Method: method })
    }

    pressGetStarted() {
        this._track('Press Get Started')
    }

    pressPersonalizeNext = content => {
        this._trackWithProperties('Press personalize next', { Content: content })
    }

    pressActivity = activity => {
        this._trackWithProperties('Press Activity', { Activity: activity })
    }

    pressCategory = category => {
        this._trackWithProperties('Press Category', { Category: category })
    }

    saveEntry = (header: string, question: string) => {
        this._trackWithProperties('Save Journal', {
            Question: question,
            Header: header
        })
    }

    loseProgress = (activity: string, index: number) => {
        this._trackWithProperties('Lose Progress', {
            Activity: activity,
            Index: index
        })
    }

    saveActivity = (activity: string) => {
        this._trackWithProperties('Save Activity', {
            Activity: activity
        })
    }

    usedReferral = (referralCode: string) => {
        this._trackWithProperties('Referral Sign Up', {
            referralCode
        })
        this.logEvent('used_referral', { referral: referralCode })
    }

    setUserId = async (id: string): Promise<void> => {
        // console.log('setUserId', id)
        await this.setUserProperties({ uid: id, os: Platform.OS })
        return firebaseAnalytics().setUserId(id)
    }

    _snakeCaseObject = (obj: any): { [key: string]: string } => {
        if (!obj || !isPlainObject(obj)) return {}
        return mapKeys(obj, (val, key) => snakeCase(toString(key)))
    }

    setUserProperties = (properties: any): Promise<void> => {
        const cleanProperties = this._snakeCaseObject(properties)
        // console.log('setUserProperties', cleanProperties)
        return firebaseAnalytics().setUserProperties(cleanProperties)
    }

    logEvent = (name: string, params?: any): Promise<void> => {
        const cleanName = snakeCase(name)
        const cleanParams = params && this._snakeCaseObject(params)
        // console.log('logEvent', cleanName, cleanParams)
        return firebaseAnalytics().logEvent(cleanName, cleanParams)
    }
}

const instance = new Tracking()

export default instance
