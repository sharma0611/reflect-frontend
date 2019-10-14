// @flow
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { AppStyles, Metrics, Colors } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import Card from 'Components/Card'
import MongoController from 'Controllers/MongoController'
import Touchable from 'Components/Touchable'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { withNavigation } from 'react-navigation'

type Props = {}

type State = {}
class RecentGoalsCard extends React.Component<Props, State> {
    state = {
        recentGoals: []
    }

    loadData = async () => {
        const recentGoals = await MongoController.fetchRecentGoals()
        await this.setState({ recentGoals })
    }

    componentDidMount() {
        this.loadData()
    }

    addGoal = async goal => {
        const { date } = this.props
        let currDayGoals = await MongoController.fetchDailyGoals(this.props.date)
        currDayGoals.push({
            idx: currDayGoals.length,
            completed: false,
            text: goal.text
        })
        await MongoController.setDailyGoals(date, currDayGoals)
        this.props.navigation.goBack(null)
    }

    render() {
        if (this.state.recentGoals.length == 0) {
            return (
                <V p={2}>
                    <T py={1} color="GreyL" titleXS>
                        Add your first goal from a category above!
                    </T>
                </V>
            )
        }
        return (
            <V pb={5}>
                <Card bg="WhiteM" p={2} mt={2}>
                    {this.state.recentGoals.map((goal, index) => (
                        <V>
                            <Touchable onPress={() => this.addGoal(goal)}>
                                <V jc="space-between" ai="center" row p={2}>
                                    <T color="GreyD">{goal.text}</T>
                                    <EntypoIcon name="plus" color={Colors.GreyD} size={20} />
                                </V>
                            </Touchable>
                            {index !== this.state.recentGoals.length - 1 && (
                                <V ai="center">
                                    <V style={styles.divider} />
                                </V>
                            )}
                        </V>
                    ))}
                </Card>
            </V>
        )
    }
}

const styles = StyleSheet.create({
    divider: {
        width: '95%',
        bottom: 0,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.GreyM,
        opacity: 0.9
    }
})

export default withNavigation(RecentGoalsCard)
