// @flow
import React, { useState } from 'react'
import { Image } from 'react-native'
import V from 'Components/V'
import T from 'Components/T'
import Header, { HEADER_HEIGHT } from 'MellowComponents/Header'
import ScrollingScreen from 'MellowComponents/ScrollingScreen'
import { withNavigation } from 'react-navigation'
import MainButton from 'MellowComponents/MainButton'
import SecondaryButton from 'MellowComponents/SecondaryButton'
import Question from 'MellowComponents/Question'
import Touchable from 'Components/Touchable'
import { upsertActivityResponse, deleteActivityResponse } from '../Controllers/FirebaseController'
import { Colors, Images } from 'Themes'
import { FEEDBACK_URL } from 'Data/urls'

const ActivityEditScreen = ({ navigation }) => {
    const { state, navigate } = navigation
    const params = state.params
    const { activity } = params
    const { questions, color, name: activityTitle, legacy } = activity
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

    const deleteResponse = async () => {
        await deleteActivityResponse(activity.id)
        navigate('Tabs')
    }

    const LeftIcon = () => {
        return (
            <Touchable onPress={deleteResponse}>
                <Image
                    source={Images.trash}
                    style={{ height: 30, width: 30, tintColor: Colors.WhiteM }}
                />
            </Touchable>
        )
    }

    const navigateToRequestForm = () => {
        navigation.navigate('WebView', { url: FEEDBACK_URL })
    }

    return (
        <V flex={1}>
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
                                setResponse: r => setResponse(index, r),
                                disabled: !!legacy
                            }}
                        />
                    </V>
                ))}
                <V ai="center" pt={2} pb={6}>
                    <MainButton onPress={submitResponses} text={`Save`} disabled={!!legacy} />
                    {legacy && (
                        <V pt={3} px={4}>
                            <T subtitle1 ta="center" color="Gray1">
                                Unfortunately, we don't support editing for legacy journals saved
                                before March 11 😢 Please request this feature below if you'd like
                                it and we will take the time to make it.
                            </T>
                            <V ai="center" pt={3}>
                                <SecondaryButton
                                    onPress={navigateToRequestForm}
                                    text={'Give us Feedback!'}
                                />
                            </V>
                        </V>
                    )}
                </V>
            </ScrollingScreen>
            <Header headerTitle={activityTitle} exit color={color} LeftIcon={LeftIcon} />
        </V>
    )
}

export default withNavigation(ActivityEditScreen)
