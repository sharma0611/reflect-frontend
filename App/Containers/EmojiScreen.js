// @flow
import React from 'react'
import { StyleSheet } from 'react-native'
import { Colors } from 'Themes'
import V from 'Components/V'
import EmojiSelector, { Categories } from 'react-native-emoji-selector'
import AsModal from 'HOC/AsModal'
import Header, { HEADER_HEIGHT } from 'Components/Header'
import Screen from 'Components/Screen'

type Props = {}

type State = {}

class EmojiScreen extends React.Component<Props, State> {
    static navigationOptions = {
        mode: 'modal',
        headerMode: 'none'
    }

    onSelectEmoji = emoji => {
        const { state, setParams, navigate } = this.props.navigation
        const params = state.params
        params.setEmoji(emoji)
        this.props.navigation.goBack()
    }

    render() {
        const { state } = this.props.navigation
        const params = state.params
        const { title } = params
        return (
            <Screen pt={HEADER_HEIGHT}>
                <V pt={2} flex={1}>
                    <EmojiSelector
                        category={Categories.people}
                        onEmojiSelected={emoji => this.onSelectEmoji(emoji)}
                        showTabs={false}
                        theme={Colors.NavyM}
                        columns={5}
                    />
                </V>
                <Header {...{ title }} />
            </Screen>
        )
    }
}

export default AsModal(EmojiScreen, {}, true)
