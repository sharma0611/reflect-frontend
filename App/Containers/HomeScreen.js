// @flow
import React from 'react'
import V from 'Components/V'
import Screen from 'Components/Screen'
import Section from 'Components/Section'
import DailyReflectionCard from 'Modules/DailyReflectionCard'
import DailyGoalsCard from 'Modules/DailyGoalsCard'
import JournalCategoriesCard from 'Modules/JournalCategoriesCard'
import MoodCard from 'Modules/MoodCard'
import ShareButton from 'Modules/ShareButton'
import FeedbackButton from 'Modules/FeedbackButton'
import TextFounderButton from 'Modules/TextFounderButton'
import AnimatedOpacity from 'HOC/AnimatedOpacity'
import ScreenHeader from 'Components/ScreenHeader'
import SectionTitle from 'Components/SectionTitle'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorageController from 'Controllers/AsyncStorageController'
import Analytics from 'Controllers/AnalyticsController'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import { Colors } from 'Themes'
import Touchable from 'Components/Touchable'
import SocialBar from 'Modules/SocialBar'

class HomeScreen extends React.Component<*> {
    state = {
        name: ''
    }
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
            // header: <ScreenHeader title={'Hey, Shivam'} {...{ navigation }} />
            // headerRight: (
            //     <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            //         <V px={3}>
            //             <FAIcon name="gear" color={Colors.GreyL} size={30} />
            //         </V>
            //     </TouchableOpacity>
            // )
        }
    }

    componentDidMount() {
        this.loadData()
        this.props.fadeIn()
    }

    loadData = async () => {
        const name = await AsyncStorageController.getName()
        await this.setState({ name })
        // AsyncStorageController.clear()
    }

    // Sections
    renderToday() {
        const today = new Date()
        return (
            <Section>
                <SectionTitle>Today</SectionTitle>
                <DailyReflectionCard
                    date={today}
                    onAction={() => Analytics.pressDailyReflection(today)}
                />
                <DailyGoalsCard date={today} onAction={() => Analytics.pressDailyGoals(today)} />
                <MoodCard date={today} />
            </Section>
        )
    }

    renderShareTheLoveSection() {
        return (
            <Section>
                <SectionTitle subTitle="Help make this app better">Share the love ❤️</SectionTitle>
                <ShareButton sharedVia="HomeScreen" />
                <FeedbackButton />
                <TextFounderButton />
                <SocialBar />
            </Section>
        )
    }

    renderJournalCategories() {
        return (
            <V>
                <Section>
                    <SectionTitle subTitle="Know Yourself">Journal Prompts</SectionTitle>
                </Section>
                <JournalCategoriesCard />
            </V>
        )
    }

    renderRightHeader = () => {
        return (
            <Touchable onPress={() => this.props.navigation.navigate('Settings')}>
                <V>
                    <FAIcon name="gear" color={Colors.GreyL} size={30} />
                </V>
            </Touchable>
        )
    }

    render() {
        return (
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps={'handled'}
                enableResetScrollToCoords={false}
            >
                <ScreenHeader
                    titleLeft={'Hey,'}
                    titleRight={` ${this.state.name}`}
                    renderRightHeader={this.renderRightHeader}
                />
                <Screen>
                    {this.renderToday()}
                    {this.renderJournalCategories()}
                    {this.renderShareTheLoveSection()}
                </Screen>
            </KeyboardAwareScrollView>
        )
    }
}

export default AnimatedOpacity(HomeScreen)
