// @flow
import React from 'react'

// Components
import { StyleSheet, SectionList } from 'react-native'
import T from 'Components/T'
import V from 'Components/V'
import Screen from 'Components/Screen'
import Section from 'Components/Section'
import { Metrics, AppStyles } from 'Themes'
import JournalPromptCard from 'Modules/JournalPromptCard'
import JournalCategoriesCard from 'Modules/JournalCategoriesCard'

// Helpers
import MongoController, { CUSTOM } from 'Controllers/MongoController'
import groupBy from 'lodash/groupBy'
import moment from 'moment'
import { formatDate } from './utils'
import { withNavigation, NavigationEvents } from 'react-navigation'
import { summary } from 'date-streaks'
import Prompts from 'Data/prompts'
import ScreenHeader from 'Components/ScreenHeader'
import SectionTitle from 'Components/SectionTitle'

type Props = {}

type State = {}

const PAGE_SIZE = 15

class JournalsScreen extends React.Component<Props, State> {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
            // title: 'Journals',
            // headerRight: (
            //     <TouchableOpacity onPress={navigation.getParam('openEmptyJournal')}>
            //         <V px={3}>
            //             <PencilIcon tintColor={Colors.GreyL} />
            //         </V>
            //     </TouchableOpacity>
            // )
        }
    }
    state = {
        sections: [],
        journals: [],
        moreData: true
    }

    componentDidMount() {
        this.props.navigation.setParams({ openEmptyJournal: this.openEmptyJournal })
        this.loadAllJournalData()
    }

    openEmptyJournal = () => {
        this.props.navigation.navigate('Journal', {
            onRightAction: async (title, text) => {
                await MongoController.insertJournal(title, text, CUSTOM)
                await this.loadAllJournalData()
                await this.props.navigation.goBack(null)
            },
            rightActionText: 'Save'
        })
    }

    loadAllJournalData = async () => {
        const journals = await MongoController.getAllJournals()
        const dateGroupedJournals = groupBy(journals, function({ date }) {
            return moment(date)
                .startOf('day')
                .format()
        })
        const sections = Object.entries(dateGroupedJournals).map((entry, index) => {
            const [date, currJournals] = entry
            const formattedDate = formatDate(new Date(date))
            currJournals.sort(function(a, b) {
                const keyA = new Date(a.timestamp),
                    keyB = new Date(b.timestamp)
                // Compare the 2 dates
                if (keyA < keyB) return 1
                if (keyA > keyB) return -1
                return 0
            })
            return { title: formattedDate, data: currJournals }
        })
        sections.sort(function(a, b) {
            const keyA = new Date(a.title),
                keyB = new Date(b.title)
            // Compare the 2 dates
            if (keyA < keyB) return 1
            if (keyA > keyB) return -1
            return 0
        })
        await this.setState({ sections, journals })
    }

    // async setupJournalGenerator() {
    //     await this.setState({ sections: [], journals: [], moreData: true })
    //     this.journalGenerator = MongoController.journalGenerator(PAGE_SIZE, this.finishedLoading)
    // }

    // finishedLoading = async () => {
    //     await this.setState({ moreData: false })
    // }

    // loadJournalData = async () => {
    //     if (!this.state.moreData) {
    //         return
    //     }
    //     var { value: journals } = await this.journalGenerator.next()
    //     if (!journals) {
    //         await this.finishedLoading()
    //         return
    //     }
    //     journals = this.state.journals.concat(journals)
    //     var dateGroupedJournals = groupBy(journals, function({ date }) {
    //         return moment(date)
    //             .startOf('day')
    //             .format()
    //     })
    //     const sections = Object.entries(dateGroupedJournals).map((entry, index) => {
    //         const [date, currJournals] = entry
    //         const formattedDate = formatDate(new Date(date))
    //         return { title: formattedDate, data: currJournals }
    //     })
    //     await this.setState({ sections, journals })
    // }

    renderJournalItem = ({ index, item, section }) => {
        const { title, text, _id, journalType: category } = item
        const color = Prompts.getCategoryColor(category)
        return (
            <Section py={0}>
                <JournalPromptCard
                    prompt={title}
                    whiteBg={!color}
                    bg={color ? color : 'WhiteM'}
                    onPress={() =>
                        this.props.navigation.navigate('Journal', {
                            title,
                            text,
                            onRightAction: async (title, text) => {
                                await MongoController.updateJournal(_id, title, text)
                                await this.loadAllJournalData()
                                await this.props.navigation.goBack(null)
                            },
                            onLeftAction: async () => {
                                await MongoController.deleteJournal(_id)
                                await this.loadAllJournalData()
                                await this.props.navigation.goBack(null)
                            },
                            rightActionText: 'Save',
                            leftActionText: 'Delete',
                            headerColor: color
                        })
                    }
                />
            </Section>
        )
    }

    renderSectionHeader({ section: { title } }) {
        return (
            <Section>
                <T color="GreyM" titleS px={2}>
                    {title}
                </T>
            </Section>
        )
    }

    renderEmptyComponent = () => {
        return (
            <V>
                <Section>
                    <V p={2}>
                        <T py={1} color="GreyL" titleXS>
                            You have no journals yet.
                        </T>
                        <T py={1} color="GreyL" titleXS>
                            Fill in your daily reflection or use a prompt from a category below to
                            get started!
                        </T>
                    </V>
                </Section>
                <JournalCategoriesCard />
            </V>
        )
    }

    renderStreaks = () => {
        const dates = this.state.sections.map(function(section) {
            return new Date(section.title)
        })

        const { currentStreak, longestStreak, todayInStreak, withinCurrentStreak } = summary({
            dates
        })

        return (
            <V>
                <ScreenHeader titleLeft={'My'} titleRight={' Journal'} />
                {(currentStreak > 0 || longestStreak > 0) && (
                    <V>
                        <Section>
                            <SectionTitle>Journal Streaks</SectionTitle>
                            <V row flex={1} jc="space-around" py={2}>
                                <V style={styles.streakCard} bg="WhiteM" jc="center">
                                    <T ta="center" color="GreyM" titleL>
                                        {currentStreak}
                                    </T>
                                    <T ta="center" color="GreyL">
                                        Current 🔥
                                    </T>
                                </V>
                                <V style={styles.streakCard} bg="WhiteM" jc="center">
                                    <T ta="center" color="GreyM" titleL>
                                        {longestStreak}
                                    </T>
                                    <T ta="center" color="GreyL">
                                        Best ⭐️
                                    </T>
                                </V>
                            </V>
                        </Section>
                    </V>
                )}
                <Section>
                    <SectionTitle>Journal History</SectionTitle>
                </Section>
            </V>
        )
    }

    render() {
        return (
            <Screen pb={0}>
                <NavigationEvents
                    onWillFocus={async () => {
                        await this.loadAllJournalData()
                    }}
                />
                <SectionList
                    renderItem={this.renderJournalItem}
                    renderSectionHeader={this.renderSectionHeader}
                    sections={this.state.sections}
                    keyExtractor={(item, index) => item._id}
                    stickySectionHeadersEnabled={false}
                    ListEmptyComponent={this.renderEmptyComponent}
                    ListHeaderComponent={this.renderStreaks}
                />
            </Screen>
        )
    }
}

const styles = StyleSheet.create({
    streakCard: {
        height: Metrics.screenWidth / 3,
        width: Metrics.screenWidth / 3,
        borderRadius: Metrics.screenWidth / 6,
        ...AppStyles.dropShadow.normal
    }
})

export default withNavigation(JournalsScreen)
