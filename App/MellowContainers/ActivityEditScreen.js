// @flow
import React, { useState } from 'react'
import { Image } from 'react-native'
import V from 'Components/V'
import T from 'Components/T'
import Header, { HEADER_HEIGHT } from 'MellowComponents/Header'
import ScrollingScreen from 'MellowComponents/ScrollingScreen'
import { withNavigation } from 'react-navigation'
import MainButton from 'MellowComponents/MainButton'
import SecondaryButton from 'MellowComponents/SecondaryButton'
import Question from 'MellowComponents/Question'
import Touchable from 'Components/Touchable'
import ActivityResponse from 'Firebase/models/ActivityResponse'
import { Colors, Images } from 'Themes'
import { FEEDBACK_URL } from 'Data/urls'

const ActivityEditScreen = ({ navigation }) => {
    const { state, navigate } = navigation
    const params = state.params
    const { activity } = params
    const { entries, color, name: activityTitle, legacy } = activity

    const initialResponseState = entries
        .map(({ responseText, positivity }, i) => ({
            [i]: { response: responseText, positivity }
        }))
        .reduce((prevVal, currVal) => ({ ...prevVal, ...currVal }))
    const [responses, setResponses] = useState(initialResponseState)
    const setResponse = (i, response) => {
        setResponses({
            ...responses,
            [i]: response
        })
    }
    const persistEntries = () => {
        const updatedJournalEntries = entries.map((journal, ind) => ({
            ...journal,
            responseText: responses[ind].response,
            ...(responses[ind].positivity && { positivity: responses[ind].positivity })
        }))
        return updatedJournalEntries
    }

    const submitResponses = async () => {
        const updatedEntries = persistEntries()
        const newActivity = { ...activity, entries: updatedEntries }
        await ActivityResponse.upsert(newActivity)
        navigate('Tabs')
    }

    const deleteResponse = async () => {
        await ActivityResponse.cascadingDelete(activity.id)
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

    const navigateToRequestForm = () => {
        navigation.navigate('WebView', { url: FEEDBACK_URL })
    }

    return (
        <V flex={1}>
            <ScrollingScreen keyboardAware fullScreen style={{ marginTop: HEADER_HEIGHT }}>
                {entries.map(({ id, questionText, useEmoji }, index) => (
                    <V key={id}>
                        <T heading3 color="Gray1" pt={3} pl={3}>
                            {`${index + 1}/${entries.length}`}
                        </T>
                        <Question
                            {...{
                                questionText,
                                useEmoji,
                                response: responses[index].response,
                                setResponse: r => setResponse(index, r),
                                disabled: !!legacy
                            }}
                        />
                    </V>
                ))}
                <V ai="center" pt={2} pb={6}>
                    <MainButton onPress={submitResponses} text={`Save`} disabled={!!legacy} />
                    {legacy && (
                        <V pt={3} px={4}>
                            <T tiny ta="center" color="BlackM">
                                Unfortunately, we don't support editing for legacy journals saved
                                before March 11 😢 Please request this feature below if you'd like
                                it and we will take the time to make it.
                            </T>
                            <V ai="center" pt={3}>
                                <SecondaryButton
                                    onPress={navigateToRequestForm}
                                    text={'Give us Feedback!'}
                                />
                            </V>
                        </V>
                    )}
                </V>
            </ScrollingScreen>
            <Header headerTitle={activityTitle} exit color={color} LeftIcon={!legacy && LeftIcon} />
        </V>
    )
}

export default withNavigation(ActivityEditScreen)
