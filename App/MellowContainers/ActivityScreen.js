// @flow
import React, { useState } from 'react'
import T from 'Components/T'
import V from 'Components/V'
import Header, { HEADER_HEIGHT } from 'MellowComponents/Header'
import WaveBackground from 'MellowComponents/WaveBackground'
import RightChevron from 'MellowComponents/RightChevron'
import Touchable from 'Components/Touchable'
import Card from 'MellowComponents/Card'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { withNavigation } from 'react-navigation'
import MainButton from 'MellowComponents/MainButton'
import Question from 'MellowComponents/Question'
import { upsertActivityResponse } from '../Controllers/FirebaseController'
import Analytics from 'Controllers/AnalyticsController'
import Modal from 'react-native-modal'
import SecondaryButton from 'MellowComponents/SecondaryButton'

const WaveHeightRatio = 0.3
const CIRCLE_WIDTH = 60

const ActivityScreen = ({ navigation }) => {
    const { state, navigate } = navigation
    const params = state.params
    let index = 0
    let { activity, index: indexSet } = params
    if (indexSet) {
        index = indexSet
    }
    const { color, entries, activityType } = activity
    const currentQuestion = entries[index]
    const { header, questionText, responseText, caption, useEmoji } = currentQuestion
    const [response, setResponse] = useState(responseText)
    const nextQuestionExists = index < entries.length - 1

    const [showModal, setShowModal] = useState(false)

    const persistResponse = () => {
        const questionWithText = { ...currentQuestion, responseText: response }
        Analytics.saveEntry(header, response?.length || 0)
        const updatedEntries = entries.map((question, ind) => {
            if (index === ind) {
                return questionWithText
            }
            return question
        })
        return updatedEntries
    }

    const nextQuestion = () => {
        const updatedEntries = persistResponse()
        let newActivity
        newActivity = { ...activity, entries: updatedEntries }
        navigate({
            routeName: 'Activity',
            params: {
                activity: newActivity,
                index: index + 1
            },
            key: index + 1
        })
    }

    const submitQuestion = async () => {
        Analytics.saveActivity(activityType)
        const updatedEntries = persistResponse()
        let newActivity
        newActivity = { ...activity, entries: updatedEntries }
        await upsertActivityResponse(newActivity)
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

    const onExit = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const loseProgress = async () => {
        Analytics.loseProgress(activityType, index)
        closeModal()
        await new Promise(r => setTimeout(r, 350))
        navigate('Tabs')
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
                        <MainButton onPress={submitQuestion} text={`Submit`} />
                    </V>
                )}
            </KeyboardAwareScrollView>
            <Modal
                isVisible={showModal}
                onBackdropPress={closeModal}
                hideModalContentWhileAnimating={true}
                avoidKeyboard={true}
            >
                <Card bg="WhiteM" alt>
                    <V p={4}>
                        <V pb={2}>
                            <T heading4>Warning! 🛑</T>
                        </V>
                        <V pb={2}>
                            <T b1>Your progress will be lost if you exit!</T>
                        </V>
                        <V ai="center" pt={3}>
                            <MainButton onPress={closeModal} text={'Keep at it'} />
                        </V>
                        <V ai="center" pt={2}>
                            <SecondaryButton onPress={loseProgress} text={'Lose my progress'} />
                        </V>
                    </V>
                </Card>
            </Modal>
            <Header headerTitle={header} onClose={onExit} exit color={color} />
        </WaveBackground>
    )
}

export default withNavigation(ActivityScreen)
