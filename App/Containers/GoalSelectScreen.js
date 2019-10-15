// @flow
import React from 'react'
import { StyleSheet, Image, FlatList } from 'react-native'
import { AppStyles, Metrics, Images, Colors } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import Screen from 'Components/Screen'
import Section from 'Components/Section'
import Header, { HEADER_HEIGHT } from 'Components/Header'
import AsModal from 'HOC/AsModal'
import Analytics from 'Controllers/AnalyticsController'
import SectionTitle from 'Components/SectionTitle'
import GoalCategories from 'Modules/GoalCategories'
import GoalCard, { CATEGORY_CARD_WIDTH, CATEGORY_CARD_HEIGHT } from 'Modules/GoalCard'
import Prompts from 'Data/prompts'
import Carousel from 'react-native-snap-carousel'
import Touchable from 'Components/Touchable'
import EntypoIcon from 'react-native-vector-icons/Entypo'

type Props = {}

type State = {}

const CATEGORY_MARGIN = 5
const SNAP_INTERVAL = CATEGORY_CARD_WIDTH + Metrics.padding.scale[CATEGORY_MARGIN]

const CENTERING_MARGIN =
    (Metrics.screenWidth - CATEGORY_CARD_WIDTH - 2 * Metrics.padding.scale[CATEGORY_MARGIN]) / 2

class GoalSelectScreen extends React.Component<Props, State> {
    constructor(props) {
        super(props)
        const cardIndex = 1
        this.state = {
            cardIndex,
            goals: []
        }
    }

    loadData = () => {
        const { category } = this.props.navigation.state.params
        let goals = Prompts.getGoalsForCategory(category.title)
        this.setState({ goals })
    }

    componentDidMount() {
        this.loadData()
        // Analytics.openJournalCategory(category)
    }

    renderItem = (goal, color) => (
        <V mr={CATEGORY_MARGIN} key={goal.title}>
            <GoalCard {...{ goal, color }} />
        </V>
    )

    next = async () => {
        const cardIndex = this.state.cardIndex + 1
        if (this._scrollRef) {
            // this._scrollRef.scrollTo({ x: cardIndex * SNAP_INTERVAL, y: 0, animated: true })
            this._scrollRef.scrollToIndex({ index: cardIndex })
        }
        await this.setState({ cardIndex })
    }

    back = async () => {
        const cardIndex = this.state.cardIndex - 1
        if (this._scrollRef && cardIndex >= 0) {
            // this._scrollRef.scrollTo({ x: cardIndex * SNAP_INTERVAL, y: 0, animated: true })
            this._scrollRef.scrollToIndex({ index: cardIndex })
            await this.setState({ cardIndex })
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
        return (
            <Screen pt={HEADER_HEIGHT} pb={0}>
                <V ai="center" flex={2} jc="center">
                    <V style={{ height: CATEGORY_CARD_HEIGHT + Metrics.padding.small }}>
                        <FlatList
                            ref={ref => (this._scrollRef = ref)}
                            horizontal
                            snapToAlignment="start"
                            decelerationRate={0}
                            snapToInterval={SNAP_INTERVAL}
                            showsHorizontalScrollIndicator={false}
                            onEndReached={this.handleLoadMore}
                            onEndThreshold={0.15}
                            contentContainerStyle={{
                                marginLeft:
                                    Metrics.padding.scale[CATEGORY_MARGIN] + CENTERING_MARGIN,
                                paddingRight:
                                    Metrics.padding.medium +
                                    Metrics.padding.scale[CATEGORY_MARGIN] +
                                    CENTERING_MARGIN,
                                marginBottom: Metrics.padding.small
                            }}
                            style={{ height: 300 }}
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
                        <V ai="center" jc="center" style={styles.button} bg={color}>
                            <EntypoIcon name="chevron-thin-left" size={30} color={Colors.WhiteM} />
                        </V>
                    </Touchable>
                    <Touchable style={styles.buttonColumn}>
                        <V ai="center" jc="center" style={styles.button} bg={color}>
                            <EntypoIcon name="plus" size={30} color={Colors.WhiteM} />
                        </V>
                    </Touchable>
                    <V ai="center" style={styles.buttonColumn}>
                        <Touchable onPress={this.next}>
                            <V ai="center" jc="center" style={styles.button} bg={color}>
                                <EntypoIcon
                                    name="chevron-thin-right"
                                    size={30}
                                    color={Colors.WhiteM}
                                />
                            </V>
                        </Touchable>
                        <V bg={color} m={2} ai="center" jc="center" style={styles.dailySkipCounter}>
                            <T heading color="WhiteM" pt={1}>
                                3
                            </T>
                        </V>
                        <SectionTitle>Daily Skips</SectionTitle>
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

export default AsModal(GoalSelectScreen, {}, true)
