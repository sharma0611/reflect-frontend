// @flow
import React, { useState } from 'react'
import { StyleSheet, Text, Image } from 'react-native'
import { Metrics, Colors } from 'Themes'
import V from 'Components/V'
import Touchable from 'Components/Touchable'
import T from 'Components/T'
import { FlatGrid } from 'react-native-super-grid'
import { getEmojis } from 'Data/EmojiService'

const EmojiSelector = ({ onSelectEmoji }) => {
    const [selected, setSelected] = useState('')

    const emojis = getEmojis()

    const onSelect = emoji => {
        setSelected(emoji)
        onSelectEmoji()
    }

    const renderEmoji = ({ item, index }) => {
        const { emoji } = item
        return (
            <Touchable onPress={() => onSelect(emoji)} key={emoji}>
                <V style={styles.circleBg} bg={selected === emoji && 'BabyBlueM'}>
                    <T style={{ fontSize: 45 }}>{emoji}</T>
                </V>
            </Touchable>
        )
    }

    return (
        <FlatGrid
            itemDimension={50}
            items={emojis}
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: 'center' }}
            staticDimension={Metrics.screenWidth - 3 * Metrics.padding.scale[3]}
            initialNumToRender={30}
            renderItem={renderEmoji}
        />
    )
}

const CIRCLE_DIAMETER = 55

const styles = StyleSheet.create({
    circleBg: {
        borderRadius: CIRCLE_DIAMETER / 2,
        height: CIRCLE_DIAMETER,
        width: CIRCLE_DIAMETER,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
})

export default EmojiSelector
