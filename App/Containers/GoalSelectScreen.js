// @flow
import React from 'react'
import { StyleSheet, Image, FlatList } from 'react-native'
import { AppStyles, Metrics, Images, Colors } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import Screen from 'Components/Screen'
import Header, { HEADER_HEIGHT } from 'Components/Header'
import AsModal from 'HOC/AsModal'
import GoalCard, { CATEGORY_CARD_WIDTH, CATEGORY_CARD_HEIGHT } from 'Modules/GoalCard'
import Prompts from 'Data/prompts'
import Touchable from 'Components/Touchable'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import AsyncStorageController from 'Controllers/AsyncStorageController'
import withState from 'State'
import MongoController from 'Controllers/MongoController'

type Props = {}

type State = {}

const CATEGORY_MARGIN = 5
const SNAP_INTERVAL = CATEGORY_CARD_WIDTH + Metrics.padding.scale[CATEGORY_MARGIN]

const CENTERING_MARGIN = (Metrics.screenWidth - CATEGORY_CARD_WIDTH) / 2

class GoalSelectScreen extends React.Component<Props, State> {
    constructor(props) {
        super(props)
        const cardIndex = 1
        this.state = {
            cardIndex,
            goals: []
        }
    }

    addGoal = async goal => {
        const { date } = this.props.navigation.state.params
        let currDayGoals = await MongoController.fetchDailyGoals(date)
        currDayGoals.push({
            idx: currDayGoals.length,
            completed: false,
            text: goal
        })
        await MongoController.setDailyGoals(date, currDayGoals)
        this.props.navigation.goBack(null)
    }

    loadData = () => {
        const { category } = this.props.navigation.state.params
        let goals = Prompts.getGoalsForCategory(category.title)
        this.setState({ goals })
    }

    loadAsyncData = async () => {
        const dailySkips = await AsyncStorageController.getDailySkips()
        this.setState({ dailySkips })
    }

    componentDidMount() {
        this.loadData()
        this.loadAsyncData()
        // Analytics.openJournalCategory(category)
    }

    renderItem = (goal, color) => (
        <V mr={CATEGORY_MARGIN} key={goal.title}>
            <GoalCard {...{ goal, color }} />
        </V>
    )

    next = async () => {
        if (this.state.dailySkips === 0 && !this.props.hasPro) {
            this.props.navigation.navigate('Paywall', { goBack: true })
        } else {
            const cardIndex = this.state.cardIndex + 1
            if (this._scrollRef) {
                // this._scrollRef.scrollTo({ x: cardIndex * SNAP_INTERVAL, y: 0, animated: true })
                this._scrollRef.scrollToIndex({ index: cardIndex })
            }
            if (!this.props.hasPro) {
                const dailySkips = await AsyncStorageController.decrementDailySkips()
                await this.setState({ cardIndex, dailySkips })
            } else {
                await this.setState({ cardIndex })
            }
        }
    }

    back = async () => {
        if (!this.props.hasPro) {
            this.props.navigation.navigate('Paywall', { goBack: true })
        } else {
            const cardIndex = this.state.cardIndex - 1
            if (this._scrollRef && cardIndex >= 0) {
                // this._scrollRef.scrollTo({ x: cardIndex * SNAP_INTERVAL, y: 0, animated: true })
                this._scrollRef.scrollToIndex({ index: cardIndex })
                await this.setState({ cardIndex })
            }
        }
    }

    handleLoadMore = () => {
        let { goals } = this.state
        goals = goals.concat(...goals)
        this.setState({ goals })
    }

    render() {
        const { date, category } = this.props.navigation.state.params
        const cardIndex = 1
        const color = Prompts.getCategoryColor(category.title)
        const snapOffsets = this.state.goals.map((val, index) => index * SNAP_INTERVAL)
        return (
            <Screen pt={HEADER_HEIGHT} pb={0}>
                <V ai="center" flex={2} jc="center">
                    <V style={{ height: CATEGORY_CARD_HEIGHT + Metrics.padding.small }}>
                        <FlatList
                            ref={ref => (this._scrollRef = ref)}
                            horizontal
                            snapToAlignment="start"
                            decelerationRate="fast"
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            onEndReached={this.handleLoadMore}
                            onEndThreshold={0.15}
                            snapToOffsets={snapOffsets}
                            contentContainerStyle={{
                                marginLeft: CENTERING_MARGIN
                            }}
                            contentOffset={{
                                y: 0,
                                x: cardIndex * SNAP_INTERVAL
                            }}
                            data={this.state.goals}
                            renderItem={({ item }) => this.renderItem(item, color)}
                        />
                    </V>
                </V>
                <V flex={1} row ai="flex-start" jc="space-around" px={4}>
                    <Touchable onPress={this.back} style={styles.buttonColumn}>
                        <V
                            ai="center"
                            jc="center"
                            style={styles.button}
                            bg={this.props.hasPro ? color : 'GreyM'}
                        >
                            <EntypoIcon name="chevron-thin-left" size={30} color={Colors.WhiteM} />
                        </V>
                    </Touchable>
                    <Touchable
                        style={styles.buttonColumn}
                        onPress={() => this.addGoal(this.state.goals[this.state.cardIndex])}
                    >
                        <V ai="center" jc="center" style={styles.button} bg={color}>
                            <EntypoIcon name="plus" size={30} color={Colors.WhiteM} />
                        </V>
                    </Touchable>
                    <V ai="center" style={styles.buttonColumn}>
                        <Touchable onPress={this.next}>
                            <V
                                ai="center"
                                jc="center"
                                style={styles.button}
                                bg={
                                    !this.props.hasPro && this.state.dailySkips === 0
                                        ? 'GreyM'
                                        : color
                                }
                            >
                                <EntypoIcon
                                    name="chevron-thin-right"
                                    size={30}
                                    color={Colors.WhiteM}
                                />
                            </V>
                        </Touchable>
                        {!this.props.hasPro && (
                            <V ai="center">
                                <V
                                    m={2}
                                    ai="center"
                                    jc="center"
                                    style={styles.dailySkipCounter}
                                    bg={this.state.dailySkips === 0 ? 'GreyM' : color}
                                >
                                    <T heading color="WhiteM" pt={1}>
                                        {this.state.dailySkips}
                                    </T>
                                </V>
                                <T heading color="GreyM">
                                    Daily Skips
                                </T>
                            </V>
                        )}
                    </V>
                </V>
                <Header
                    title={`${category.title} Goals`}
                    onClose={() => this.props.navigation.goBack()}
                    bg={color}
                    white={true}
                />
            </Screen>
        )
    }
}

const BUTTON_RADIUS = 80
const SKIP_COUNTER_BUTTON_RADIUS = 40

const styles = StyleSheet.create({
    button: {
        height: BUTTON_RADIUS,
        width: BUTTON_RADIUS,
        borderRadius: BUTTON_RADIUS / 2
    },
    dailySkipCounter: {
        height: SKIP_COUNTER_BUTTON_RADIUS,
        width: SKIP_COUNTER_BUTTON_RADIUS,
        borderRadius: SKIP_COUNTER_BUTTON_RADIUS / 2
    },
    buttonColumn: {
        alignItems: 'center',
        width: (Metrics.screenWidth - 2 * Metrics.padding.scale[4]) / 3
    }
})

const GoalSelectScreenModal = AsModal(GoalSelectScreen, {}, true)
export default withState(GoalSelectScreenModal, 'userExposedTo')
