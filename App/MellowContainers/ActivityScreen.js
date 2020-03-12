// @flow
import React, { useState } from 'react'
import T from 'Components/T'
import V from 'Components/V'
import Header, { HEADER_HEIGHT } from 'MellowComponents/Header'
import WaveBackground from 'MellowComponents/WaveBackground'
import RightChevron from 'MellowComponents/RightChevron'
import Touchable from 'Components/Touchable'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { withNavigation } from 'react-navigation'
import MainButton from 'MellowComponents/MainButton'
import Question from 'MellowComponents/Question'
import { upsertActivityResponse } from '../Controllers/FirebaseController'

const WaveHeightRatio = 0.3
const CIRCLE_WIDTH = 60

const ActivityScreen = ({ navigation }) => {
    const { state, navigate } = navigation
    const params = state.params
    const { activity, index } = params
    const { color, entries } = activity
    const currentQuestion = entries[index]
    const { header, questionText, responseText, caption, useEmoji } = currentQuestion
    const [response, setResponse] = useState(responseText)
    const nextQuestionExists = index < entries.length - 1

    const persistResponse = () => {
        const questionWithText = { ...currentQuestion, responseText: response }
        const updatedEntries = entries.map((question, ind) => {
            if (index === ind) {
                return questionWithText
            }
            return question
        })
        return updatedEntries
    }

    const nextQuestion = async () => {
        const updatedEntries = persistResponse()
        let newActivity
        newActivity = { ...activity, entries: updatedEntries }
        if (!newActivity.id) {
            // wait and get ID before passing it on
            newActivity = await upsertActivityResponse(newActivity)
        } else {
            // we already have an id, so just get on with the show and
            //      we'll save this in the background :-)
            upsertActivityResponse(newActivity)
        }
        if (nextQuestionExists) {
            navigate({
                routeName: 'Activity',
                params: {
                    activity: newActivity,
                    index: index + 1
                },
                key: index + 1
            })
        } else {
            navigate('Tabs')
            // navigate to success screen in the future
        }
    }

    // When we add a back button, use this. (or when we navigate directly to journal)
    // For now, just enter from the top of a journal activity
    const previousQuestion = () => {
        const prevQuestionExists = index > 0
        // const updatedQuestions = persistResponse()
        if (prevQuestionExists) {
            navigate('Tabs')
            // navigate({
            //     routeName: 'MultiQuestion',
            //     params: {
            //         questions: updatedQuestions,
            //         index: index - 1,
            //         color
            //     },
            //     key: index - 1
            // })
        }
    }

    return (
        <WaveBackground heightRatio={WaveHeightRatio} fullScreen>
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps={'handled'}
                enableResetScrollToCoords={false}
                style={{ marginTop: HEADER_HEIGHT }}
                nestedScrollEnabled={true}
            >
                <T heading3 color="Gray1" pt={3} pl={3}>
                    {`${index + 1}/${entries.length}`}
                </T>
                <Question
                    {...{
                        response,
                        questionText,
                        useEmoji,
                        setResponse,
                        caption
                    }}
                />
                {nextQuestionExists ? (
                    <Touchable onPress={nextQuestion}>
                        <V jc="flex-end" row pr={4}>
                            <V
                                style={{
                                    height: CIRCLE_WIDTH,
                                    width: CIRCLE_WIDTH,
                                    borderRadius: CIRCLE_WIDTH / 2,
                                    backgroundColor: color
                                }}
                                ai="center"
                                jc="center"
                            >
                                <RightChevron tintColor="WhiteM" />
                            </V>
                        </V>
                    </Touchable>
                ) : (
                    <V ai="center" pt={2}>
                        <MainButton onPress={nextQuestion} text={`Submit`} />
                    </V>
                )}
            </KeyboardAwareScrollView>
            <Header headerTitle={header} exit color={color} />
        </WaveBackground>
    )
}

export default withNavigation(ActivityScreen)
