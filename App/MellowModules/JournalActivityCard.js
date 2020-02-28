// @flow
import React from 'react'
import { Image } from 'react-native'
import Card from 'MellowComponents/Card'
import V from 'Components/V'
import T from 'Components/T'
import Touchable from 'Components/Touchable'
import { Images, Colors } from 'Themes'
import { withNavigation } from 'react-navigation'

const QUESTIONS = [
    {
        header: 'Daily Mood',
        title: '1/4',
        subtitle: 'How am I feeling today?',
        useEmoji: true
    },
    {
        header: 'Daily Mood',
        title: '2/4',
        subtitle: 'What made me feel this way?'
    },
    {
        header: 'Retrospective',
        title: '3/4',
        subtitle: 'What moment would I go back and change today?'
    },
    {
        header: 'Positive',
        title: '4/4',
        subtitle: 'What am I looking forward to do tomorrow?'
    }
]

const JournalActivityCard = ({ activity, navigation }) => {
    const { activityTitle, journalEntries } = activity

    const renderJournalEntry = (entry, index) => {
        const { questionText, responseText } = entry
        return (
            <V key={index} row>
                <V>
                    <T>{index + 1}</T>
                </V>
                <V>
                    <T>{questionText}</T>
                    <T>{responseText.slice(0, 20)}...</T>
                </V>
            </V>
        )
    }
    return (
        <Touchable
            onPress={() =>
                navigation.navigate('MultiQuestion', {
                    questions: journalEntries,
                    color: Colors.PastelPurple,
                    index: 0
                })
            }
        >
            <Card bg="WhiteM" style={{ width: '100%' }} mb={3}>
                <V p={3} pb={0} bg="PastelPurple" row jc="space-between">
                    <T color="WhiteM">{activityTitle}</T>
                    <Image
                        source={Images.edit}
                        style={{
                            height: 15,
                            width: 15,
                            resizeMode: 'contain',
                            tintColor: Colors.WhiteM
                        }}
                    />
                </V>
                <Image source={Images.waveGlyphF} style={{ width: '100%', marginTop: -1 }} />
                <V
                    pl={3}
                    pb={3}
                    pr={4}
                    bg="WhiteM"
                    style={{
                        borderBottomRightRadius: 30,
                        borderBottomLeftRadius: 10
                    }}
                >
                    {journalEntries.map((entry, index) => renderJournalEntry(entry, index))}
                </V>
            </Card>
        </Touchable>
    )
}

export default withNavigation(JournalActivityCard)
