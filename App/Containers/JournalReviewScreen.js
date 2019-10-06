// @flow
import React from 'react'
import { StyleSheet } from 'react-native'
import { Colors } from 'Themes'
import V from 'Components/V'
import AsModal from 'HOC/AsModal'
import Header, { HEADER_HEIGHT } from 'Components/Header'
import Screen from 'Components/Screen'
import Section from 'Components/Section'
import DailyReflectionCard from 'Modules/DailyReflectionCard'
import DailyGoalsCard from 'Modules/DailyGoalsCard'
import MoodCard from 'Modules/MoodCard'
import Analytics from 'Controllers/AnalyticsController'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

type Props = {}

type State = {}

class JournalReviewScreen extends React.Component<Props, State> {
    static navigationOptions = {
        mode: 'modal',
        headerMode: 'none'
    }

    onSelectEmoji = emoji => {
        const { state, setParams, navigate } = this.props.navigation
        const params = state.params
        params.setEmoji(emoji)
        this.props.navigation.goBack()
    }

    render() {
        const { state } = this.props.navigation
        const params = state.params
        const { date } = params
        const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' }
        const title = date.toLocaleDateString('en-US', options)
        return (
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps={'handled'}
                enableResetScrollToCoords={false}
            >
                <Screen pt={HEADER_HEIGHT}>
                    <Section>
                        {/* <SectionTitle>Today</SectionTitle> */}
                        <DailyReflectionCard
                            date={date}
                            onAction={() => Analytics.pressDailyReflection(date)}
                        />
                        <DailyGoalsCard
                            date={date}
                            onAction={() => Analytics.pressDailyGoals(date)}
                        />
                        <MoodCard date={date} />
                    </Section>
                    <Header {...{ title }} />
                </Screen>
            </KeyboardAwareScrollView>
        )
    }
}

export default AsModal(JournalReviewScreen, {}, true)
