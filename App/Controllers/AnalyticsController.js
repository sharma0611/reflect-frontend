// @flow
import { Platform } from 'react-native'
import { AppEventsLogger } from 'react-native-fbsdk'
import moment from 'moment'
import camelCase from 'lodash-es/camelCase'
import Segment from '@segment/analytics-react-native'
import Profile from 'Firebase/models/Profile'

const safeCamelCase = item => {
    if (typeof item === 'string') {
        return camelCase(item)
    } else {
        return item
    }
}

const camelCaseProps = props => {
    const cleanParams = Object.entries(props)
        .map(([key, value]) => ({
            [camelCase(key)]: safeCamelCase(value)
        }))
        .reduce((prevVal, currVal) => ({ ...prevVal, ...currVal }))
    return cleanParams
}

class Tracking {
    // Send and event name with no properties
    _track = (eventName: string) => {
        AppEventsLogger.logEvent(eventName)
        Segment.track(camelCase(eventName))
    }

    // Track event with properties
    _trackWithProperties = (eventName: string, props: any) => {
        AppEventsLogger.logEvent(eventName, null, props)
        const cleanProps = camelCaseProps(props)
        Segment.track(camelCase(eventName), cleanProps)
    }

    _set = (props: any) => {
        const uid = Profile.uid()
        const cleanProps = camelCaseProps(props)
        if (uid) {
            Segment.identify(uid, cleanProps)
        } else {
            Segment.identify(cleanProps)
        }
    }

    setUserPropertiesOnce = ({ email, name }: { email: string, name: string }) => {
        const createdAt = new Date().toISOString()
        this._set({ os: Platform.OS, email, name, createdAt })
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
        this._set({ pro: true })
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
        this._set({ referredBy: referralCode })
    }
}

const instance = new Tracking()

export default instance
