// @flow
import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import T from 'Components/T'
import V from 'Components/V'
import { Fonts, Colors, Metrics } from 'Themes'
import EmojiSelector from 'MellowComponents/EmojiSelector'

const Question = ({ questionText, response, useEmoji, setResponse, caption, disabled }) => {
    return (
        <V>
            <T pl={3} p={2} heading4>
                {questionText}
            </T>
            {useEmoji ? (
                <V bg="WhiteM" br={3} m={3} style={{ height: 350, overflow: 'hidden' }}>
                    <EmojiSelector onSelectEmoji={emoji => setResponse(emoji)} emoji={response} />
                </V>
            ) : (
                <V bg="WhiteM" br={3} m={3} style={{ height: 200 }}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setResponse(text)}
                        value={response}
                        multiline={true}
                        autoGrow={true}
                        editable={!disabled}
                        autoFocus={false}
                        placeholderTextColor={Colors.GreyM}
                        selectionColor={Colors.Black}
                    />
                </V>
            )}
            {!!caption && (
                <V mx={4} mb={3}>
                    <T b1 px={1}>
                        {caption}
                    </T>
                </V>
            )}
        </V>
    )
}

const styles = StyleSheet.create({
    input: {
        ...Fonts.style.body1,
        flex: 1,
        color: Colors.Black,
        padding: Metrics.padding.scale[3],
        paddingTop: Metrics.padding.scale[3]
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
