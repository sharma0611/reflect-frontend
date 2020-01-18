// @flow
import React from 'react'
import { StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import T from 'Components/T'
import V from 'Components/V'
import Screen from 'Components/Screen'
import Section from 'Components/Section'
import TouchableCard from 'Components/TouchableCard'
import AsModal from 'HOC/AsModal'
import Header, { HEADER_HEIGHT } from 'Components/Header'
import { Fonts, Colors, Images } from 'Themes'
import WaveBackground from 'MellowComponents/WaveBackground'

const WaveHeightRatio = 0.3

type Props = {}

type State = {}

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
            headerColor
        } = params

        return (
            <WaveBackground heightRatio={WaveHeightRatio}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.select({ android: undefined, ios: 'padding' })}
                    keyboardVerticalOffset={Platform.select({ ios: 60, android: -200 })}
                >
                    <Section>
                        <V pt={1}>
                            <TextInput
                                style={styles.title}
                                onChangeText={title => this.setState({ title })}
                                value={this.state.title}
                                multiline={true}
                                autoGrow={false}
                                autoFocus={false}
                                placeholder={'Journal Title'}
                            />
                        </V>
                    </Section>
                    <Section flex={1}>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => this.setState({ text })}
                            value={this.state.text}
                            multiline={true}
                            autoGrow={true}
                            autoFocus={true}
                            placeholder={'My journal response...'}
                            placeholderTextColor={Colors.GreyM}
                        />
                    </Section>
                    <V row jc="space-around" ai="center">
                        {onLeftAction && (
                            <TouchableCard
                                bg="WhiteM"
                                p={2}
                                px={3}
                                containerStyle={styles.bottomLeftButtonContainer}
                                onPress={() => onLeftAction()}
                            >
                                <T color="GreyL">
                                    {leftActionText}
                                    {'  '}>
                                </T>
                            </TouchableCard>
                        )}
                        <TouchableCard
                            bg="WhiteM"
                            p={2}
                            px={3}
                            containerStyle={styles.bottomRightButtonContainer}
                            onPress={() => onRightAction(this.state.title, this.state.text)}
                        >
                            <T color="GreyL">
                                {rightActionText}
                                {'  '}>
                            </T>
                        </TouchableCard>
                    </V>
                </KeyboardAvoidingView>
                <Header
                    title={headerTitle ? headerTitle : ` `}
                    bg={headerColor ? headerColor : 'BeigeM'}
                    white={!!headerColor}
                    onClose={() => {
                        onRightAction(this.state.title, this.state.text)
                    }}
                />
            </WaveBackground>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        ...Fonts.style.body,
        color: Colors.GreyD
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

export default AsModal(JournalScreen, {}, true)
