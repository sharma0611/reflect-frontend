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
import Prompts from 'Data/prompts'
import Analytics from 'Controllers/AnalyticsController'
import withState from 'State'

type Props = {}

type State = {}

class JournalCategoryScreen extends React.Component<Props, State> {
    componentDidMount() {
        const { category } = this.props.navigation.state.params
        Analytics.openJournalCategory(category)
    }
    render() {
        const { category } = this.props.navigation.state.params
        const color = Prompts.getCategoryColor(category)
        return (
            <Screen pt={HEADER_HEIGHT}>
                <ScrollView>
                    <Section>
                        <JournalPromptsCard
                            {...{ category }}
                            numPrompts={15}
                            hasPro={this.props.hasPro}
                            onPressMore={() => this.props.navigation.navigate('Paywall')}
                        />
                    </Section>
                </ScrollView>
                <Header title={category} bg={color} white={true} />
            </Screen>
        )
    }
}

const JournalCategoryModal = AsModal(JournalCategoryScreen, {}, true)

export default withState(JournalCategoryModal, 'userExposedTo')
