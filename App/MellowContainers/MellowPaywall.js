// @flow
import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { Metrics, Colors, Images, AppStyles } from 'Themes'
import V from 'Components/V'
import T from 'Components/T'
import Section from 'MellowComponents/Section'
import Card from 'MellowComponents/Card'
import WaveCard from 'MellowComponents/WaveCard'
import ScrollingScreen from 'MellowComponents/ScrollingScreen'
import usePrices from '../Hooks/usePrices'
import Loading from '../MellowComponents/Loading'
import ErrorScreen from '../MellowContainers/ErrorScreen'
import Touchable from 'Components/Touchable'
import { withNavigation } from 'react-navigation'
import { purchaseMonthly, purchaseYearly } from 'Controllers/PurchasesController'
import SecondaryButton from 'MellowComponents/SecondaryButton'

const CIRCLE_DIAMETER = 25
const NEXT_CIRCLE_DIAMETER = 40

const VALUE_PROPS = [
    'Personalized Reflections',
    '1000+ Journal Prompts',
    'Lock your journals and more!'
]

const MellowPaywall = ({ navigation }) => {
    const { loading, error, prices } = usePrices()
    if (loading) return <Loading />
    if (error) return <ErrorScreen {...{ error }} />
    const { yearly, monthly } = prices

    const buyYearly = async () => {
        await purchaseYearly()
        navigation.goBack()
    }
    const buyMonthly = async () => {
        await purchaseMonthly()
        navigation.goBack()
    }

    return (
        <ScrollingScreen>
            <V row jc="flex-end">
                <V flex={3} />
                <Image source={Images.cloudAndSun} style={styles.cloudGlyph} />
                <V flex={1} />
            </V>
            <V ai="center" pt={3}>
                <V style={styles.logoBar} row jc="flex-end" ai="center">
                    <V>
                        <T heading1 color="Gray2">
                            reflect
                        </T>
                        <T subtitle1 color="Gray2">
                            premium
                        </T>
                    </V>
                    <V pl={2}>
                        <Image style={styles.logo} source={Images.logo} />
                    </V>
                </V>
            </V>
            <Section>
                <Card alt bg="WhiteM" mt={3}>
                    <V p={3} pt={1}>
                        {VALUE_PROPS.map((text, index) => (
                            <V key={index} row pt={3}>
                                <V
                                    style={{
                                        width: CIRCLE_DIAMETER,
                                        height: CIRCLE_DIAMETER,
                                        borderRadius: CIRCLE_DIAMETER / 2
                                    }}
                                    ai="center"
                                    jc="center"
                                    bg="Blue2"
                                >
                                    <T color="WhiteM" caption>
                                        {index + 1}
                                    </T>
                                </V>
                                <V pl={2} mr={2} style={{ paddingTop: 2 }}>
                                    <T b1 color="Gray1">
                                        {text}
                                    </T>
                                </V>
                            </V>
                        ))}
                    </V>
                </Card>
            </Section>
            <V flex={1} />
            <Section>
                <Touchable onPress={buyMonthly}>
                    <WaveCard tintColor={Colors.BabyBlueM}>
                        <V row p={3} ai="center" jc="space-between" flex={1}>
                            <T>
                                <T heading3 color="Gray2">
                                    {monthly}
                                </T>
                                <T subtitle1 color="Gray1">
                                    {' '}
                                    monthly
                                </T>
                            </T>
                            <V
                                style={{
                                    width: NEXT_CIRCLE_DIAMETER,
                                    height: NEXT_CIRCLE_DIAMETER,
                                    borderRadius: NEXT_CIRCLE_DIAMETER / 2,
                                    ...AppStyles.dropShadow.small
                                }}
                                bg="BabyBlueM"
                                ai="center"
                                jc="center"
                            >
                                <Image
                                    source={Images.leftChevron}
                                    style={{
                                        tintColor: Colors.WhiteM,
                                        height: NEXT_CIRCLE_DIAMETER - 15,
                                        width: NEXT_CIRCLE_DIAMETER - 15,
                                        resizeMode: 'contain',
                                        transform: [{ rotate: '180deg' }]
                                    }}
                                />
                            </V>
                        </V>
                    </WaveCard>
                </Touchable>
            </Section>
            <Section>
                <Touchable onPress={buyYearly}>
                    <WaveCard tintColor={Colors.PastelGold}>
                        <V row p={3} ai="center" jc="space-between" flex={1}>
                            <T>
                                <T heading3 color="Gray2">
                                    {yearly}
                                </T>
                                <T subtitle1 color="Gray1">
                                    {' '}
                                    yearly
                                </T>
                            </T>
                            <V
                                style={{
                                    width: NEXT_CIRCLE_DIAMETER,
                                    height: NEXT_CIRCLE_DIAMETER,
                                    borderRadius: NEXT_CIRCLE_DIAMETER / 2,
                                    ...AppStyles.dropShadow.small
                                }}
                                bg="PastelGold"
                                ai="center"
                                jc="center"
                            >
                                <Image
                                    source={Images.leftChevron}
                                    style={{
                                        tintColor: Colors.Gray2,
                                        height: NEXT_CIRCLE_DIAMETER - 15,
                                        width: NEXT_CIRCLE_DIAMETER - 15,
                                        resizeMode: 'contain',
                                        transform: [{ rotate: '180deg' }]
                                    }}
                                />
                            </V>
                        </V>
                    </WaveCard>
                </Touchable>
            </Section>
            <Section ai="center" pb={4}>
                <SecondaryButton onPress={() => navigation.goBack()} text={'Later'} />
            </Section>
        </ScrollingScreen>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
        tintColor: Colors.Blue2
    },
    logoBar: {
        height: 80
    },
    waveBoatGlyph: {
        width: Metrics.screenWidth
    },
    cloudGlyph: {
        height: 60,
        width: 60,
        resizeMode: 'contain'
    }
})

MellowPaywall.navigationOptions = {
    header: null
}

export default withNavigation(MellowPaywall)
