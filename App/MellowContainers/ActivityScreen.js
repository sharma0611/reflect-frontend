// @flow
import React, { useState } from 'react'
import { ScrollView, StyleSheet, TextInput } from 'react-native'
import T from 'Components/T'
import V from 'Components/V'
import Header, { HEADER_HEIGHT } from 'MellowComponents/Header'
import { Fonts, Colors } from 'Themes'
import WaveBackground from 'MellowComponents/WaveBackground'
import RightChevron from 'MellowComponents/RightChevron'
import Touchable from 'Components/Touchable'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { withNavigation } from 'react-navigation'
import MainButton from 'MellowComponents/MainButton'
import EmojiSelector from 'MellowComponents/EmojiSelector'
import Question from 'MellowComponents/Question'

const WaveHeightRatio = 0.3
const CIRCLE_WIDTH = 60

const ActivityScreen = ({ navigation }) => {
    const { state, navigate } = navigation
    const params = state.params
    const { activity, index } = params
    const { color, questions } = activity
    const currentQuestion = questions[index]
    const { header, questionText, responseText, caption, useEmoji } = currentQuestion
    const [response, setResponse] = useState(responseText)

    const nextQuestionExists = index < questions.length - 1

    const persistResponse = () => {
        const questionWithText = { ...currentQuestion, text: response }
        const updatedQuestions = questions.map((question, ind) => {
            if (index === ind) {
                return questionWithText
            }
            return question
        })
        return updatedQuestions
    }

    const nextQuestion = () => {
        const updatedQuestions = persistResponse()
        const newActivity = { ...activity, questions: updatedQuestions }
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
            // navigate to success screen in the future
        }
    }

    const submitResponses = () => {
        const updatedQuestions = persistResponse()
        console.log(`👨‍🌾 => `, updatedQuestions)
        // add submit logic here
        navigate('Tabs')
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
                    {`${index + 1}/${questions.length}`}
                </T>
                <Question {...{ response, questionText, useEmoji, setResponse, caption }} />
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
                        <MainButton onPress={submitResponses} text={`Submit`} />
                    </V>
                )}
            </KeyboardAwareScrollView>
            <Header headerTitle={header} exit color={color} />
        </WaveBackground>
    )
}

export default withNavigation(ActivityScreen)
