// @flow
import React, { useState } from 'react'
import V from 'Components/V'
import T from 'Components/T'
import Header, { HEADER_HEIGHT } from 'MellowComponents/Header'
import ScrollingScreen from 'MellowComponents/ScrollingScreen'
import { withNavigation } from 'react-navigation'
import MainButton from 'MellowComponents/MainButton'
import Question from 'MellowComponents/Question'
import { upsertActivityResponse } from '../Controllers/FirebaseController'

const ActivityEditScreen = ({ navigation }) => {
    const { state, navigate } = navigation
    const params = state.params
    const { activity } = params
    const { questions, color, name: activityTitle } = activity
    // const { header, questionText, responseText, caption, useEmoji } = currentQuestion
    const initialResponseState = questions
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
        const updatedJournalEntries = questions.map((journal, ind) => ({
            ...journal,
            responseText: responses[ind]
        }))
        return updatedJournalEntries
    }

    const submitResponses = () => {
        const updatedQuestions = persistResponses()
        const newActivity = { ...activity, questions: updatedQuestions }
        upsertActivityResponse(newActivity)
        navigate('Tabs')
    }

    return (
        <V>
            <ScrollingScreen keyboardAware fullScreen style={{ marginTop: HEADER_HEIGHT }}>
                {questions.map(({ questionText, useEmoji }, index) => (
                    <V>
                        <T heading3 color="Gray1" pt={3} pl={3}>
                            {`${index + 1}/${questions.length}`}
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
