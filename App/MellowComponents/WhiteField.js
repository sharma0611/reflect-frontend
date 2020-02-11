// @flow
import * as React from 'react'
import { StyleSheet, TouchableWithoutFeedback, TextInput } from 'react-native'
import { AppStyles, Metrics, Colors, Fonts } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'

type Props = {
    onChangeText: any,
    submit: any
}

class WhiteField extends React.Component<Props, State> {
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => this.input.focus()}>
                <V p={1} mt={4} bg="WhiteM" br={2} ai="center" jc="center">
                    <TextInput
                        ref={input => {
                            this.input = input
                        }}
                        editable
                        maxLength={50}
                        autoFocus={true}
                        blurOnSubmit={true}
                        autoCompleteType="name"
                        returnKeyType="done"
                        onSubmitEditing={this.props.submit}
                        onChangeText={this.props.onChangeText}
                        style={{ color: Colors.Gray2, ...Fonts.style.heading4 }}
                    />
                </V>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({})

export default WhiteField
