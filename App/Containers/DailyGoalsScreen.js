// @flow
import React from 'react'
import { StyleSheet, Image, ScrollView } from 'react-native'
import { AppStyles, Metrics, Images, Colors } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import JournalPromptsCard from 'Modules/JournalPromptsCard'
import Screen from 'Components/Screen'
import Section from 'Components/Section'
import Header, { HEADER_HEIGHT } from 'Components/Header'
import AsModal from 'HOC/AsModal'
import Analytics from 'Controllers/AnalyticsController'

type Props = {}

type State = {}

class DailyGoalsScreen extends React.Component<Props, State> {
    componentDidMount() {
        // Analytics.openJournalCategory(category)
    }

    render() {
        return (
            <Screen pt={HEADER_HEIGHT}>
                <ScrollView>
                    <Section></Section>
                </ScrollView>
                <Header title={'Daily Goals'} bg={Colors.GreenL} white={true} />
            </Screen>
        )
    }
}

export default AsModal(DailyGoalsScreen, {}, true)
