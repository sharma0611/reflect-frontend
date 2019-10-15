// @flow
import React from 'react'
import { StyleSheet, Image, ScrollView, Animated } from 'react-native'
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
import RecentGoalsCard from 'Modules/RecentGoalsCard'
import Prompts from 'Data/prompts'

type Props = {}

type State = {}

class DailyGoalsScreen extends React.Component<Props, State> {
    constructor(props) {
        super(props)
        this.state = {
            headerColor: new Animated.Value(0)
        }
    }

    render() {
        const categories = Prompts.getAllGoalCategories()
        const categoryColors = categories.map(category => Colors.getColor(category.color))
        const categoryIndices = categories.map((category, index) => index)
        let color = this.state.headerColor.interpolate({
            inputRange: categoryIndices,
            outputRange: categoryColors
        })
        const { date } = this.props.navigation.state.params
        return (
            <Screen pt={HEADER_HEIGHT} pb={0}>
                <ScrollView>
                    <Section pb={2} mt={2}>
                        <SectionTitle>Goal Categories</SectionTitle>
                    </Section>
                    <GoalCategories
                        date={date}
                        headerColor={this.state.headerColor}
                        setHeaderColor={headerColor => this.state.headerColor.setValue(headerColor)}
                    />
                    <Section mt={2}>
                        <SectionTitle>My Recent Goals</SectionTitle>
                        <RecentGoalsCard date={date} />
                    </Section>
                </ScrollView>
                <Header title={'Daily Goals'} white={true} animatedColor={color} bg={'GreenL'} />
            </Screen>
        )
    }
}

export default AsModal(DailyGoalsScreen, {}, true)
