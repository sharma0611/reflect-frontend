// @flow
import React, { useState } from 'react'
import V from 'Components/V'
import T from 'Components/T'
import Header, { HEADER_HEIGHT } from 'MellowComponents/Header'
import WaveBackground from 'MellowComponents/WaveBackground'
import ScrollingScreen from 'MellowComponents/ScrollingScreen'
import { withNavigation } from 'react-navigation'
import MainButton from 'MellowComponents/MainButton'
import Question from 'MellowComponents/Question'

const WaveHeightRatio = 0.3

const ActivityEditScreen = ({ navigation }) => {
    const { state, navigate } = navigation
    const params = state.params
    const { activity } = params
    const { journalEntries, color, activityTitle } = activity
    // const { header, questionText, responseText, caption, useEmoji } = currentQuestion
    const initialResponseState = journalEntries
        .map(({ responseText }, i) => ({
            [i]: responseText
        }))
        .reduce((prevVal, currVal) => ({ ...prevVal, ...currVal }))
    const [responses, setResponses] = useState(initialResponseState)

    const setResponse = (i, response) => {
        setResponses({
            ...responses,
            [i]: response
        })
    }

    const persistResponses = () => {
        const updatedJournalEntries = journalEntries.map((journal, ind) => ({
            ...journal,
            responseText: responses[ind]
        }))
        return updatedJournalEntries
    }

    const submitResponses = () => {
        const updatedJournalEntries = persistResponses()
        console.log(`👨‍🌾 => `, updatedJournalEntries)
        // maybe construct activity object here and pass to firebase?
        navigate('Tabs')
    }

    return (
        <V>
            <ScrollingScreen keyboardAware fullScreen style={{ marginTop: HEADER_HEIGHT }}>
                {journalEntries.map(({ questionText, useEmoji }, index) => (
                    <V>
                        <T heading3 color="Gray1" pt={3} pl={3}>
                            {`${index + 1}/${journalEntries.length}`}
                        </T>
                        <Question
                            {...{
                                questionText,
                                useEmoji,
                                response: responses[index],
                                setResponse: r => setResponse(index, r)
                            }}
                        />
                    </V>
                ))}
                <V ai="center" pt={2} pb={6}>
                    <MainButton onPress={submitResponses} text={`Save`} />
                </V>
            </ScrollingScreen>
            <Header headerTitle={activityTitle} exit color={color} />
        </V>
    )
}

export default withNavigation(ActivityEditScreen)
