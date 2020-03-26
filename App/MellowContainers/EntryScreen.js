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
import Touchable from 'Components/Touchable'
import moment from 'moment'
import Analytics from 'Controllers/AnalyticsController'
import Entry from 'Firebase/models/Entry'

const WaveHeightRatio = 0.3

const EntryScreen = ({ navigation }) => {
    const { state, navigate } = navigation
    const params = state.params
    const { entry } = params
    const color = Colors.PastelPurple
    const {
        header,
        questionText,
        responseText,
        caption,
        useEmoji,
        timestamp,
        positivity: initialPositivity,
        id
    } = entry
    const [{ response, positivity }, setResponse] = useState({
        response: responseText,
        positivity: initialPositivity
    })

    const persistResponse = () => {
        Analytics.saveEntry(header, response?.length || 0)
        const updatedEntry = { ...entry, responseText: response, ...(positivity && { positivity }) }
        return updatedEntry
    }

    const submit = async () => {
        let updatedEntry = persistResponse()
        await Entry.upsert(updatedEntry, timestamp)
        navigate('Tabs')
    }
    const dateString = moment(timestamp)
        .startOf('day')
        .format('dddd, MMM Do')

    const deleteResponse = async () => {
        await Entry.cascadingDelete(id)
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
