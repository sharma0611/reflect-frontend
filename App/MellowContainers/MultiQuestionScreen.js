// @flow
import React, { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import T from 'Components/T'
import V from 'Components/V'
import Header, { HEADER_HEIGHT } from 'MellowComponents/Header'
import { Fonts, Colors } from 'Themes'
import WaveBackground from 'MellowComponents/WaveBackground'
import RightChevron from 'MellowComponents/RightChevron'
import Touchable from 'Components/Touchable'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { withNavigation } from 'react-navigation'

const WaveHeightRatio = 0.3

type Props = {}

type State = {}

const CIRCLE_WIDTH = 60

const MultiQuestionScreen = ({ navigation }) => {
    const { state, setParams, navigate } = navigation
    const params = state.params
    const { questions, color, index, activityTitle } = params
    const currentQuestion = questions[index]
    const { title, subtitle, caption, text } = currentQuestion
    const [response, setResponse] = useState(text)

    return (
        <WaveBackground heightRatio={WaveHeightRatio} fullScreen>
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps={'handled'}
                enableResetScrollToCoords={false}
                style={{ marginTop: HEADER_HEIGHT }}
            >
                <T heading3 color="Gray1" pt={3} pl={3}>
                    {title}
                </T>
                <T pl={3} p={2} heading4>
                    {subtitle}
                </T>
                <V bg="WhiteM" br={3} m={3} p={3} style={{ height: 200 }}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setResponse(text)}
                        value={response}
                        multiline={true}
                        autoGrow={true}
                        autoFocus={true}
                        placeholderTextColor={Colors.GreyM}
                        selectionColor={Colors.Black}
                    />
                </V>
                <Touchable
                    onPress={() =>
                        navigate({
                            routeName: 'MultiQuestion',
                            params: {
                                questions,
                                index: index + 1,
                                color,
                                activityTitle
                            },
                            key: index + 1
                        })
                    }
                >
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
            </KeyboardAwareScrollView>
            <Header
                headerTitle={activityTitle}
                exit
                color={color}
                onClose={() => console.log(`👨‍🌾 => `, 'yo')}
            />
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
