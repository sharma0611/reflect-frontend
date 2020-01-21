// @flow
import React from 'react'
import { StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import T from 'Components/T'
import V from 'Components/V'
import Screen from 'Components/Screen'
import Section from 'Components/Section'
import TouchableCard from 'Components/TouchableCard'
import AsModal from 'HOC/AsModal'
import Header, { HEADER_HEIGHT } from 'MellowComponents/Header'
import { Fonts, Colors, Images, Metrics } from 'Themes'
import WaveBackground from 'MellowComponents/WaveBackground'
import { ScrollView } from 'react-native-gesture-handler'
import RightChevron from 'MellowComponents/RightChevron'
import Touchable from 'Components/Touchable'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const WaveHeightRatio = 0.3

type Props = {}

type State = {}

const CIRCLE_WIDTH = 60

class JournalScreen extends React.Component<Props, State> {
    constructor(props) {
        super(props)
        const { state, setParams, navigate } = this.props.navigation
        const params = state.params
        const { title, text } = params
        this.state = { title, text }
    }

    render() {
        const { state, setParams, navigate } = this.props.navigation
        const params = state.params
        const {
            onRightAction,
            onLeftAction,
            leftActionText,
            rightActionText,
            headerTitle,
            subTitle,
            headerColor
        } = params

        return (
            <WaveBackground heightRatio={WaveHeightRatio} fullScreen>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps={'handled'}
                    enableResetScrollToCoords={false}
                    style={{ marginTop: HEADER_HEIGHT }}
                >
                    <T heading3 color="Gray1" pt={3} pl={3}>
                        {subTitle}
                    </T>
                    <T pl={3} p={2} heading4>
                        {this.state.title}
                    </T>
                    <V bg="WhiteM" br={3} m={3} p={3} style={{ height: 200 }}>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => this.setState({ text })}
                            value={this.state.text}
                            multiline={true}
                            autoGrow={true}
                            autoFocus={true}
                            placeholderTextColor={Colors.GreyM}
                            selectionColor={Colors.Black}
                        />
                    </V>
                    <Touchable onPress={() => onRightAction(this.state.title, this.state.text)}>
                        <V jc="flex-end" row pr={4}>
                            <V
                                bg="PastelPurple"
                                style={{
                                    height: CIRCLE_WIDTH,
                                    width: CIRCLE_WIDTH,
                                    borderRadius: CIRCLE_WIDTH / 2
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
                    headerTitle={headerTitle}
                    exit
                    onClose={() => onRightAction(this.state.title, this.state.text)}
                />
            </WaveBackground>
        )
    }
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

export default JournalScreen
