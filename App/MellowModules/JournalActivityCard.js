// @flow
import React from 'react'
import { Image } from 'react-native'
import Card from 'MellowComponents/Card'
import V from 'Components/V'
import T from 'Components/T'
import Touchable from 'Components/Touchable'
import { Images, Colors } from 'Themes'
import { withNavigation } from 'react-navigation'

const CIRCLE_DIAMETER = 25

const JournalActivityCard = ({ activity, navigation }) => {
    const { activityTitle, color, questions } = activity

    const renderJournalEntry = (entry, index) => {
        const { questionText, responseText } = entry
        return (
            <V key={index} row pt={3}>
                <V
                    style={{
                        width: CIRCLE_DIAMETER,
                        height: CIRCLE_DIAMETER,
                        borderRadius: CIRCLE_DIAMETER / 2,
                        backgroundColor: color
                    }}
                    ai="center"
                    jc="center"
                >
                    <T color="WhiteM" caption>
                        {index + 1}
                    </T>
                </V>
                <V pl={2} mr={2} style={{ paddingTop: 2 }}>
                    <T b1 color="Gray1">
                        {questionText}
                    </T>
                    <V pt={1}>
                        <T caption color="Gray1">
                            {responseText.slice(0, 40)}
                            {responseText.length > 40 && '...'}
                        </T>
                    </V>
                </V>
            </V>
        )
    }
    return (
        <Touchable
            onPress={() =>
                navigation.navigate({
                    routeName: 'ActivityEdit',
                    params: {
                        activity,
                        color: Colors.PastelPurple,
                        index: 0
                    }
                })
            }
        >
            <Card bg="WhiteM" style={{ width: '100%' }} mb={3}>
                <V p={3} pb={0} row jc="space-between" style={{ backgroundColor: color }}>
                    <T color="WhiteM" b1>
                        {activityTitle}
                    </T>
                    <Image
                        source={Images.edit}
                        style={{
                            height: 15,
                            width: 15,
                            resizeMode: 'contain',
                            tintColor: Colors.WhiteM
                        }}
                    />
                </V>
                <Image
                    source={Images.waveGlyphF}
                    style={{ width: '100%', tintColor: color, marginTop: -1 }}
                />
                <V
                    pl={3}
                    pb={3}
                    pr={4}
                    bg="WhiteM"
                    style={{
                        borderBottomRightRadius: 30,
                        borderBottomLeftRadius: 10
                    }}
                >
                    {questions.map((entry, index) => renderJournalEntry(entry, index))}
                </V>
            </Card>
        </Touchable>
    )
}

export default withNavigation(JournalActivityCard)
