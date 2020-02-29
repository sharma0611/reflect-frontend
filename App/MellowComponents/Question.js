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

const Question = ({ questionText, response, useEmoji, setResponse }) => {
    return (
        <V>
            <T pl={3} p={2} heading4>
                {questionText}
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
        </V>
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

export default Question
