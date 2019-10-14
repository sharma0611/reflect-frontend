// @flow
import React from 'react'
import { TouchableWithoutFeedback, Platform, StyleSheet, TextInput, Image } from 'react-native'
import Touchable from 'Components/Touchable'
import { Images, Colors, Fonts } from 'Themes'
import Card from 'Components/Card'
import T from 'Components/T'
import V from 'Components/V'
import MongoController from 'Controllers/MongoController'
import EntypoIcon from 'react-native-vector-icons/Entypo'
// import Analytics from 'Controllers/AnalyticsController'
import { NavigationEvents, withNavigation } from 'react-navigation'

type CheckboxProps = {
    checked: boolean,
    setChecked?: Function
}

const Checkbox = (props: CheckboxProps) => {
    const { checked, toggleChecked } = props
    const imageUri = checked ? Images.checkedCircle : Images.uncheckedCircle
    let CheckboxImage = <Image source={imageUri} style={styles.checkbox} />
    if (toggleChecked) {
        CheckboxImage = (
            <TouchableWithoutFeedback onPress={toggleChecked}>
                {CheckboxImage}
            </TouchableWithoutFeedback>
        )
    }
    return (
        <V pabs style={styles.checkboxContainer}>
            {CheckboxImage}
        </V>
    )
}

class Goal extends React.Component<*> {
    componentDidMount() {
        if (this.props.focus) {
            this.inputRef.focus()
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.focus && !prevProps.focus) {
            this.inputRef.focus()
        }
    }

    render() {
        const {
            text,
            completed,
            toggleCompleted,
            onPressEnter,
            onPressDelete,
            onChangeText
        } = this.props

        const onKeyPress = ({ nativeEvent: { key: keyValue } }) => {
            if (keyValue === 'Backspace' && text === '') {
                onPressDelete()
            }
        }

        return (
            <V p={1} style={styles.textContainer}>
                <Checkbox {...{ checked: completed, toggleChecked: toggleCompleted }} />
                <V pt={1}>
                    <TextInput
                        ref={input => {
                            this.inputRef = input
                        }}
                        style={styles.goalText}
                        onChangeText={text => {
                            onChangeText(text)
                        }}
                        value={text}
                        multiline={true}
                        scrollEnabled={false}
                        autoFocus={false}
                        placeholder={`What would you like to accomplish today?`}
                        placeholderTextColor={Colors.WhiteGreen}
                        returnKeyType="next"
                        textAlignVertical="top"
                        blurOnSubmit={true}
                        onKeyPress={onKeyPress}
                        onSubmitEditing={async () => {
                            await onPressEnter()
                        }}
                    />
                </V>
            </V>
        )
    }
}

const EmptyFirstGoal = { text: '', completed: false, idx: 0 }

class DailyGoalsCard extends React.Component<Props, State> {
    state = {
        goals: [EmptyFirstGoal],
        dirty: false,
        typing: false
    }

    componentDidMount() {
        this.bootstrap()
        let intervalId = setInterval(this.timer, 500)
        this.intervalId = intervalId
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId)
    }

    timer = () => {
        const { dirty, typing } = this.state
        if (dirty && !typing) {
            this.persistGoals(this.state.goals)
            this.setState({ dirty: false })
        } else if (dirty) {
            this.setState({ typing: false })
        }
    }

    persistGoals = async goals => {
        this.props.onAction()
        let goalsWithIds = await MongoController.setDailyGoals(this.props.date, goals)
        goalsWithIds = goalsWithIds.filter(Boolean)
        goals = goals.map(x => Object.assign(x, goalsWithIds.find(y => y.idx === x.idx)))
        goals.sort((a, b) => a.idx - b.idx)
        await this.setState({ goals })
    }

    onPressEnter = async currentGoalIdx => {
        const { goals } = this.state
        let newGoals = goals.map(goal => {
            if (goal.idx > currentGoalIdx) {
                goal.idx = goal.idx + 1
            }
            goal.focus = undefined
            return goal
        })
        newGoals.push({
            idx: currentGoalIdx + 1,
            completed: false,
            text: '',
            focus: true
        })
        await this.setState({ goals: newGoals })
    }

    onPressDelete = async currentGoalIdx => {
        const { goals } = this.state
        const { date } = this.props
        const { _id } = goals.find(item => item.idx === currentGoalIdx)
        if (_id) {
            await MongoController.deleteDailyGoal(date, _id)
        }
        if (goals.length === 1) {
            await this.setState({ goals: [EmptyFirstGoal] })
        } else {
            let newGoals = goals.filter(item => item.idx !== currentGoalIdx)
            newGoals = newGoals.map(goal => {
                goal.focus = undefined
                if (goal.idx > currentGoalIdx) {
                    goal.idx = goal.idx - 1
                }
                if (goal.idx === currentGoalIdx - 1) {
                    goal.focus = true
                }
                return goal
            })
            await this.setState({ goals: newGoals })
        }
    }

    bootstrap = async () => {
        const goals = await MongoController.fetchDailyGoals(this.props.date)
        if (goals.length > 0) {
            await this.setState({ goals })
        }
    }

    onChangeText = async (text, idx) => {
        let { goals } = this.state
        goals.map(item => {
            if (item.idx === idx) {
                item.text = text
            }
        })
        await this.setState({ goals, typing: true, dirty: true })
    }

    toggleCompleted = async idx => {
        let { goals } = this.state
        goals.map(item => {
            if (item.idx === idx) {
                item.completed = !item.completed
            }
        })
        await this.setState({ goals })
    }

    render() {
        const { goals } = this.state
        const { date } = this.props
        if (Platform.OS === 'android') {
            return null
        }
        return (
            <Card bg="GreenL" mt={2} pb={2} p={1}>
                <NavigationEvents
                    onWillFocus={async () => {
                        await this.bootstrap()
                    }}
                />
                <T color="WhiteM" heading pt={2} pl={2} pb={1}>
                    My daily goals
                </T>
                {goals.map(({ _id, text, completed, focus, idx }) => (
                    <Goal
                        key={`${_id}${idx}`}
                        {...{ text, completed, focus }}
                        onChangeText={text => this.onChangeText(text, idx)}
                        onPressEnter={() => this.onPressEnter(idx)}
                        onPressDelete={() => this.onPressDelete(idx)}
                    />
                ))}
                <V pabs style={{ top: 10, right: 10 }}>
                    <Touchable
                        onPress={() => this.props.navigation.navigate('DailyGoals', { date })}
                    >
                        <EntypoIcon name="circle-with-plus" size={30} color={Colors.WhiteM} />
                    </Touchable>
                </V>
            </Card>
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
    },
    goalText: {
        ...Fonts.style.body,
        color: Colors.WhiteM,
        paddingTop: 0
    }
})

export default withNavigation(DailyGoalsCard)
