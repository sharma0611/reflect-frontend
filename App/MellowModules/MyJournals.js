// @flow
import React, { useState, useEffect } from 'react'
import { SectionList } from 'react-native'
import { Colors } from 'Themes'
import V from 'Components/V'
import T from 'Components/T'
import MongoController, { CUSTOM } from 'Controllers/MongoController'
import groupBy from 'lodash/groupBy'
import moment from 'moment'
import { formatDate } from 'Containers/utils'
import Prompts from 'Data/prompts'
import JournalActivityCard from 'MellowModules/JournalActivityCard'
import Section from 'MellowComponents/Section'
import Card from 'MellowComponents/Card'
import { currentUid, dateToFirestoreTimestamp } from 'Controllers/FirebaseController'

const JournalEntries = [
    {
        header: 'Daily Mood',
        questionText: 'How am I feeling today?',
        responseText: '😍',
        useEmoji: true
    },
    {
        header: 'Daily Mood',
        questionText: 'What made me feel this way?',
        responseText: 'I went to a friends place and they gave me ice cream'
    },
    {
        header: 'Retrospective',
        questionText: 'What moment would I go back and change today?',
        responseText: 'I would go back and change my alarm'
    },
    {
        header: 'Positive',
        questionText: 'What am I looking forward to do tomorrow?',
        responseText: 'Im looking forward to working'
    }
]

const JournalActivityA = {
    activityTitle: 'Daily Reflection',
    activityId: 'DAILY_REFLECTION',
    color: Colors.PastelPurple,
    questions: JournalEntries
}

const sections = [
    {
        title: '11/24/20',
        data: [JournalActivityA, JournalActivityA]
    },
    {
        title: '11/22/20',
        data: [JournalActivityA, JournalActivityA]
    }
]

const MyJournals = ({ renderHeader, activityResponses, hasMore, loadMore }) => {
    const [legacyJournals, setLegacyJournals] = useState([])
    useEffect(() => {
        loadAllJournalData()
    }, [])

    const mapResponsestoSections = responses => {
        const dateGroupedResponses = groupBy(responses, function({ timestamp }) {
            // check if timestamp, since for local journals timestamp is not available until saved on server
            if (timestamp) {
                const date = timestamp.toDate()
                return moment(date)
                    .startOf('day')
                    .format()
            }
        })
        const sections = Object.entries(dateGroupedResponses).map((entry, index) => {
            const [date, currJournals] = entry
            const formattedDate = formatDate(new Date(date))
            currJournals.sort(function(a, b) {
                const keyA = a.timestamp.toDate(),
                    keyB = b.timestamp.toDate()
                // Compare the 2 dates
                if (keyA < keyB) return 1
                if (keyA > keyB) return -1
                return 0
            })
            return { title: formattedDate, data: currJournals }
        })
        return sections
    }

    let responses = activityResponses
    if (!hasMore) {
        responses = [...activityResponses, ...legacyJournals]
    }

    const sections = mapResponsestoSections(responses)

    const mapLegacyJournalsToActivityResponses = journals => {
        const uid = currentUid()
        return journals.map(journal => {
            return {
                legacy: true,
                color: Colors[Prompts.getCategoryColor(journal.journalType)],
                id: journal._id,
                isPro: false,
                name: '',
                subtitle: '',
                uid,
                timestamp: dateToFirestoreTimestamp(journal.date),
                questions: [
                    {
                        caption: '',
                        legacyCategoryId: journal.journalType,
                        header: '',
                        questionId: journal._id,
                        questionText: journal.title,
                        responseText: journal.text
                    }
                ]
            }
        })
    }

    const loadAllJournalData = async () => {
        let journals = await MongoController.getAllJournals()
        journals = mapLegacyJournalsToActivityResponses(journals)
        // console.log(`legacy‍ => `, journals)
        // const dateGroupedJournals = groupBy(journals, function({ date }) {
        //     return moment(date)
        //         .startOf('day')
        //         .format()
        // })
        // const sections = Object.entries(dateGroupedJournals).map((entry, index) => {
        //     const [date, currJournals] = entry
        //     const formattedDate = formatDate(new Date(date))
        //     currJournals.sort(function(a, b) {
        //         const keyA = new Date(a.timestamp),
        //             keyB = new Date(b.timestamp)
        //         // Compare the 2 dates
        //         if (keyA < keyB) return 1
        //         if (keyA > keyB) return -1
        //         return 0
        //     })
        //     return { title: formattedDate, data: currJournals }
        // })
        // sections.sort(function(a, b) {
        //     const keyA = new Date(a.title),
        //         keyB = new Date(b.title)
        //     // Compare the 2 dates
        //     if (keyA < keyB) return 1
        //     if (keyA > keyB) return -1
        //     return 0
        // })
        setLegacyJournals(journals)
    }

    // const renderJournalEntry = ({ index, item, section }) => {
    //     const { title, text, _id, journalType: category } = item
    //     const color = Prompts.getCategoryColor(category)
    //     return <JournalEntryCard {...{ title, text, color }} />
    // }

    // const renderJournalActivity = {}

    const renderJournalActivity = ({ item: activity, section, index }) => {
        return (
            <Section pt={0}>
                <JournalActivityCard {...{ activity }} />
            </Section>
        )
    }

    const renderSectionHeader = ({ section: { title } }) => {
        return (
            <Section pt={2} pb={2}>
                <T color="Gray2" heading5>
                    {title}
                </T>
            </Section>
        )
    }

    const renderEmptyComponent = () => (
        <Section pt={4} pb={2}>
            <Card alt bg="WhiteM">
                <V p={3}>
                    <V pb={2}>
                        <T heading4>No journals yet</T>
                    </V>
                    <V pb={2}>
                        <T>Try a journal activity from the home screen 😁</T>
                    </V>
                </V>
            </Card>
        </Section>
    )
    return (
        <SectionList
            bounces={false}
            renderItem={renderJournalActivity}
            renderSectionHeader={renderSectionHeader}
            sections={sections}
            keyExtractor={(item, index) => item.id}
            stickySectionHeadersEnabled={false}
            ListEmptyComponent={renderEmptyComponent}
            ListHeaderComponent={renderHeader}
            onEndReached={() => {
                hasMore && loadMore({ fresh: false })
            }}
            onEndReachedThreshold={0.1}
        />
    )
}

export default MyJournals
