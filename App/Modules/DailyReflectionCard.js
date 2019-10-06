// @flow
import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { Images } from 'Themes'
import TouchableCard from 'Components/TouchableCard'
import T from 'Components/T'
import V from 'Components/V'
import Prompts from 'Data/prompts'
import MongoController, { DAILY_REFLECTION } from 'Controllers/MongoController'
import Analytics from 'Controllers/AnalyticsController'
import { NavigationEvents, withNavigation } from 'react-navigation'

class DailyReflectionCard extends React.Component<*> {
    state = {
        completedPositive: false,
        completedNegative: false,
        completedGeneral: false
    }

    loadState = async () => {
        const { date } = this.props
        const PROMPTS = new Prompts(date)
        const positivePrompt = PROMPTS.getPositivePrompt()
        const negativePrompt = PROMPTS.getNegativePrompt()
        const generalPrompt = PROMPTS.getGeneralPrompt()
        const completedPositive = await MongoController.isDailyQuestionCompleted(
            positivePrompt,
            date
        )
        const completedNegative = await MongoController.isDailyQuestionCompleted(
            negativePrompt,
            date
        )
        const completedGeneral = await MongoController.isDailyQuestionCompleted(generalPrompt, date)
        this.setState({ completedPositive, completedNegative, completedGeneral })
    }

    componentDidMount = () => {
        this.loadState()
    }

    updateJournal = (id, title, text) => {
        MongoController.updateJournal(id, title, text)
        this.props.navigation.goBack(null)
    }

    saveJournal = (title, text) => {
        const { date } = this.props
        MongoController.insertJournal(title, text, DAILY_REFLECTION, date)
        this.props.navigation.goBack(null)
    }

    deleteJournal = (title, text) => {
        MongoController.insertJournal(title, text, DAILY_REFLECTION)
        this.props.navigation.goBack(null)
    }

    markPositiveCompleted = () => {
        this.setState({ completedPositive: true })
    }

    markNegativeCompleted = () => {
        this.setState({ completedNegative: true })
    }

    markGeneralCompleted = () => {
        this.setState({ completedGeneral: true })
    }

    renderCheckCircle = completed => {
        if (completed) {
            return (
                <V pabs style={styles.checkboxContainer}>
                    <Image source={Images.checkedCircle} style={styles.checkbox} />
                </V>
            )
        }

        return (
            <V pabs style={styles.checkboxContainer}>
                <Image source={Images.uncheckedCircle} style={styles.checkbox} />
            </V>
        )
    }

    beginReflection = async () => {
        Analytics.openDailyReflection()
        this.props.onAction()
        const { date } = this.props
        const PROMPTS = new Prompts(date)
        const positivePrompt = PROMPTS.getPositivePrompt()
        const negativePrompt = PROMPTS.getNegativePrompt()
        const generalPrompt = PROMPTS.getGeneralPrompt()
        const positiveJournal = await MongoController.getDailyQuestionJournal(positivePrompt, date)
        const negativeJournal = await MongoController.getDailyQuestionJournal(negativePrompt, date)
        const generalJournal = await MongoController.getDailyQuestionJournal(generalPrompt, date)
        this.props.navigation.navigate('Journal', {
            title: positivePrompt,
            headerTitle: '1/3: Positive',
            headerColor: 'NavyM',
            rightActionText: 'Next',
            text: positiveJournal.text,
            onRightAction: (title, text) => {
                if (positiveJournal._id) {
                    this.updateJournal(positiveJournal._id, title, text)
                } else {
                    this.saveJournal(title, text)
                }
                if (text) {
                    this.markPositiveCompleted()
                }
                this.props.navigation.navigate('Journal', {
                    title: negativePrompt,
                    headerTitle: '2/3: Retrospective',
                    headerColor: 'NavyM',
                    rightActionText: 'Next',
                    text: negativeJournal.text,
                    onRightAction: (title, text) => {
                        if (negativeJournal._id) {
                            this.updateJournal(negativeJournal._id, title, text)
                        } else {
                            this.saveJournal(title, text)
                        }
                        if (text) {
                            this.markNegativeCompleted()
                        }
                        this.props.navigation.navigate('Journal', {
                            title: generalPrompt,
                            headerTitle: '3/3: Ongoing',
                            headerColor: 'NavyM',
                            rightActionText: 'Finished',
                            text: generalJournal.text,
                            onRightAction: (title, text) => {
                                if (generalJournal._id) {
                                    this.updateJournal(generalJournal._id, title, text)
                                } else {
                                    this.saveJournal(title, text)
                                }
                                if (text) {
                                    this.markGeneralCompleted()
                                }
                            }
                        })
                    }
                })
            }
        })
    }

    render() {
        const { date } = this.props
        const PROMPTS = new Prompts(date)
        const positivePrompt = PROMPTS.getPositivePrompt()
        const negativePrompt = PROMPTS.getNegativePrompt()
        const generalPrompt = PROMPTS.getGeneralPrompt()
        return (
            <TouchableCard bg="BrandM" mt={2} pb={2} p={1} onPress={this.beginReflection}>
                <T color="WhiteM" heading pt={2} pl={2} pb={1}>
                    My daily reflection
                </T>
                <V p={1} style={styles.textContainer}>
                    {this.renderCheckCircle(this.state.completedPositive)}
                    <T color="WhiteM" pt={1}>
                        {positivePrompt}
                    </T>
                </V>
                <V p={1} style={styles.textContainer}>
                    {this.renderCheckCircle(this.state.completedNegative)}
                    <T color="WhiteM" pt={1}>
                        {negativePrompt}
                    </T>
                </V>
                <V p={1} style={styles.textContainer}>
                    {this.renderCheckCircle(this.state.completedGeneral)}
                    <T color="WhiteM" pt={1}>
                        {generalPrompt}
                    </T>
                </V>
                <NavigationEvents
                    onWillFocus={async () => {
                        await this.loadState()
                    }}
                />
            </TouchableCard>
        )
    }
}

const styles = StyleSheet.create({
    checkbox: {
        height: 20
    },
    checkboxContainer: {
        left: 10,
        top: 8
    },
    textContainer: {
        paddingLeft: 40
    }
})

export default withNavigation(DailyReflectionCard)
