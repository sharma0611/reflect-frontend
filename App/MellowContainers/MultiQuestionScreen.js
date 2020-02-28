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

const WaveHeightRatio = 0.3

type Props = {}

type State = {}

const CIRCLE_WIDTH = 60

const MultiQuestionScreen = ({ navigation }) => {
    const { state, navigate } = navigation
    const params = state.params
    const { questions, color, index } = params
    const currentQuestion = questions[index]
    const { header, title, subtitle, caption, text, useEmoji } = currentQuestion
    const [response, setResponse] = useState(text)

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
        if (nextQuestionExists) {
            navigate({
                routeName: 'MultiQuestion',
                params: {
                    questions: updatedQuestions,
                    index: index + 1,
                    color
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
                    {title}
                </T>
                <T pl={3} p={2} heading4>
                    {subtitle}
                </T>
                {useEmoji ? (
                    <V bg="WhiteM" br={3} m={3} style={{ height: 350, overflow: 'hidden' }}>
                        <EmojiSelector onSelectEmoji={emoji => setResponse(emoji)} />
                    </V>
                ) : (
                    <V bg="WhiteM" br={3} m={3} p={3} style={{ height: 200 }}>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setResponse(text)}
                            value={response}
                            multiline={true}
                            autoGrow={true}
                            autoFocus={false}
                            placeholderTextColor={Colors.GreyM}
                            selectionColor={Colors.Black}
                        />
                    </V>
                )}
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

const styles = StyleSheet.create({
    input: {
        ...Fonts.style.body1,
        flex: 1,
        color: Colors.Black
    },
    title: {
        ...Fonts.style.titleS,
        color: Colors.GreyL
    },
    bottomRightButtonContainer: {
        // margin: Metrics.padding.xxLarge
    },
    bottomLeftButtonContainer: {
        // margin: Metrics.padding.xxLarge
    }
})

export default withNavigation(MultiQuestionScreen)
