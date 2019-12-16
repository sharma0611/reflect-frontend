// @flow
import Mixpanel from 'react-native-mixpanel'
import config from 'Config/AppConfig'
import moment from 'moment'

class Tracking {
    constructor() {
        Mixpanel.sharedInstanceWithToken(config.MIXPANEL_TOKEN)
    }
    // Send and event name with no properties
    _track = (eventName: string) => {
        Mixpanel.track(eventName)
    }

    // Track event with properties
    _trackWithProperties = (eventName: string, props: any) => {
        Mixpanel.trackWithProperties(eventName, props)
    }

    // set people properties
    // You should pass in any props with spacing, e.g:
    // { ['Has Robo']: true }
    _set = (props: any) => {
        Mixpanel.set(props)
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

    viewScreen = (screenName: string) => {
        this._track('View ' + screenName)
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

    saveDailyGoal = () => {
        this._track('Save daily goal')
    }

    updateDailyGoal = (_id, length) => {
        this._trackWithProperties('Update daily goal', { _id, Length: length })
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

    unlockPro() {
        this._track('Unlock Pro')
    }

    lockPro() {
        this._track('Lock Pro')
    }
}

const instance = new Tracking()

export default instance
