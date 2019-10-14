// @flow
import React from 'react'
import { StyleSheet, Image, ScrollView } from 'react-native'
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
import GoalCard, { CATEGORY_CARD_WIDTH } from 'Modules/GoalCard'
import Prompts from 'Data/prompts'
import Carousel from 'react-native-snap-carousel'
import Touchable from 'Components/Touchable'
import EntypoIcon from 'react-native-vector-icons/Entypo'

type Props = {}

type State = {}

const CATEGORY_MARGIN = 6
const SNAP_INTERVAL = CATEGORY_CARD_WIDTH + Metrics.padding.scale[CATEGORY_MARGIN]

const CENTERING_MARGIN =
    (Metrics.screenWidth - CATEGORY_CARD_WIDTH - 2 * Metrics.padding.scale[CATEGORY_MARGIN]) / 2

class GoalSelectScreen extends React.Component<Props, State> {
    constructor(props) {
        super(props)
        const cardIndex = 1
        this.state = {
            cardIndex
        }
    }

    componentDidMount() {
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
            this._scrollRef.scrollTo({ x: cardIndex * SNAP_INTERVAL, y: 0, animated: true })
        }
        await this.setState({ cardIndex })
    }

    back = async () => {
        const cardIndex = this.state.cardIndex - 1
        if (this._scrollRef) {
            this._scrollRef.scrollTo({ x: cardIndex * SNAP_INTERVAL, y: 0, animated: true })
        }
        await this.setState({ cardIndex })
    }

    render() {
        const { date, category } = this.props.navigation.state.params
        const cardIndex = 1
        const goals = Prompts.getGoalsForCategory(category.title)
        const color = Prompts.getCategoryColor(category.title)
        return (
            <Screen pt={HEADER_HEIGHT} pb={0}>
                <V ai="center" pt={8} pb={7}>
                    <ScrollView
                        ref={ref => (this._scrollRef = ref)}
                        horizontal
                        snapToAlignment="start"
                        decelerationRate={0}
                        snapToInterval={SNAP_INTERVAL}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            marginLeft: Metrics.padding.scale[CATEGORY_MARGIN] + CENTERING_MARGIN,
                            paddingRight: Metrics.padding.medium,
                            marginBottom: Metrics.padding.small
                        }}
                        contentOffset={{
                            y: 0,
                            x: cardIndex * SNAP_INTERVAL
                        }}
                    >
                        {goals.map(goal => this.renderItem(goal, color))}
                    </ScrollView>
                </V>
                <V row ai="center" jc="space-around" px={4}>
                    <Touchable onPress={this.back}>
                        <V ai="center" jc="center" style={styles.button} bg={color}>
                            <EntypoIcon name="chevron-thin-left" size={30} color={Colors.WhiteM} />
                        </V>
                    </Touchable>
                    <Touchable>
                        <V ai="center" jc="center" style={styles.button} bg={color}>
                            <EntypoIcon name="plus" size={30} color={Colors.WhiteM} />
                        </V>
                    </Touchable>
                    <Touchable onPress={this.next}>
                        <V ai="center" jc="center" style={styles.button} bg={color}>
                            <EntypoIcon name="chevron-thin-right" size={30} color={Colors.WhiteM} />
                        </V>
                    </Touchable>
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

const styles = StyleSheet.create({
    button: {
        height: BUTTON_RADIUS,
        width: BUTTON_RADIUS,
        borderRadius: BUTTON_RADIUS / 2
    }
})

export default AsModal(GoalSelectScreen, {}, true)
