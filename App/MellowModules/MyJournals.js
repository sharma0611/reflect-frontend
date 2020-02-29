// @flow
import React, { useState } from 'react'
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
    journalEntries: JournalEntries
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

const MyJournals = ({ renderHeader }) => {
    const [legacyJournals, setLegacyJournals] = useState([])
    const loadAllJournalData = async () => {
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
        console.log(`👨‍🌾 => `, sections)
        // setLegacyJournals(sections)
    }

    // const renderJournalEntry = ({ index, item, section }) => {
    //     const { title, text, _id, journalType: category } = item
    //     const color = Prompts.getCategoryColor(category)
    //     return <JournalEntryCard {...{ title, text, color }} />
    // }

    // const renderJournalActivity = {}

    loadAllJournalData()

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

    return (
        <SectionList
            renderItem={renderJournalActivity}
            renderSectionHeader={renderSectionHeader}
            sections={sections}
            // keyExtractor={(item, index) => item._id}
            stickySectionHeadersEnabled={false}
            // ListEmptyComponent={this.renderEmptyComponent}
            ListHeaderComponent={renderHeader}
        />
    )
}

export default MyJournals
