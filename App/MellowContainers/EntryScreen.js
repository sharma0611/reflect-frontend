// @flow
import React, { useState } from 'react'
import { Image } from 'react-native'
import V from 'Components/V'
import T from 'Components/T'
import { Colors, Images } from 'Themes'
import Header, { HEADER_HEIGHT } from 'MellowComponents/Header'
import WaveBackground from 'MellowComponents/WaveBackground'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { withNavigation } from 'react-navigation'
import MainButton from 'MellowComponents/MainButton'
import Question from 'MellowComponents/Question'
import { upsertEntry, deleteSafeEntry } from '../Controllers/FirebaseController'
import Touchable from 'Components/Touchable'
import moment from 'moment'

const WaveHeightRatio = 0.3

const EntryScreen = ({ navigation }) => {
    const { state, navigate } = navigation
    const params = state.params
    const { entry } = params
    const color = Colors.PastelPurple
    const { header, questionText, responseText, caption, useEmoji, timestamp, id } = entry
    const [response, setResponse] = useState(responseText)

    const persistResponse = () => {
        const updatedEntry = { ...entry, responseText: response }
        return updatedEntry
    }

    const submit = async () => {
        let updatedEntry = persistResponse()
        await upsertEntry(updatedEntry, timestamp.toDate())
        navigate('Tabs')
    }
    const dateString = moment(timestamp.toDate())
        .startOf('day')
        .format('dddd, MMM Do')

    const deleteResponse = async () => {
        await deleteSafeEntry(id)
        navigate('Tabs')
    }

    const LeftIcon = () => {
        return (
            <Touchable onPress={deleteResponse}>
                <Image
                    source={Images.trash}
                    style={{ height: 30, width: 30, tintColor: Colors.WhiteM }}
                />
            </Touchable>
        )
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
                    {dateString}
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
                <V ai="center" pt={2}>
                    <MainButton onPress={submit} text={`Submit`} />
                </V>
            </KeyboardAwareScrollView>
            <Header headerTitle={header} exit color={color} LeftIcon={id && LeftIcon} />
        </WaveBackground>
    )
}

export default withNavigation(EntryScreen)
