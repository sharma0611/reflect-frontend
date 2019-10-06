// @flow
import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { AppStyles, Metrics, Colors } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import Screen from 'Components/Screen'
import Section from 'Components/Section'
import AsModal from 'HOC/AsModal'
import Header, { HEADER_HEIGHT } from 'Components/Header'
import TouchableCard from 'Components/TouchableCard'
import Card from 'Components/Card'
import { FEEDBACK_URL } from 'Data/urls'

type Props = {}

type State = {}

class ComingSoonScreen extends React.Component<Props, State> {
    render() {
        return (
            <Screen pt={HEADER_HEIGHT} bg="transparent">
                <Section>
                    <Card bg="WhiteM" ai="center" m={2}>
                        <V row bg={'BrandM'} p={2} ai="center" style={styles.headerContainer}>
                            <T color="WhiteM" emphasis heading pl={2}>
                                Thank you for your interest!
                            </T>
                            <V flex={1} />
                        </V>
                        <V p={2} py={3}>
                            <T ta="center" color="GreyL">
                                We'll make sure you're the first one to know... 🕵️‍♂️
                            </T>
                        </V>
                        <V p={2} py={3}>
                            <T ta="center" color="GreyL">
                                Give us your feedback and enter your email in the form below!
                            </T>
                        </V>
                    </Card>
                </Section>
                <Section p={5} flex={1} jc="center">
                    <TouchableCard
                        bg="BrandM"
                        p={3}
                        my={1}
                        onPress={() =>
                            this.props.navigation.navigate('WebView', { url: FEEDBACK_URL })
                        }
                    >
                        <V row py={1}>
                            <V flex={8}>
                                <T heading emphasis color="WhiteM">
                                    Take me to the form!
                                </T>
                            </V>
                            <V flex={1}>
                                <T ta="right" color="WhiteM">
                                    >
                                </T>
                            </V>
                        </V>
                    </TouchableCard>
                </Section>
                <Header title={'Coming Soon'} bg="BrandM" white />
            </Screen>
        )
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        borderTopLeftRadius: Metrics.padding.small,
        borderTopRightRadius: Metrics.padding.small
    }
})

export default AsModal(ComingSoonScreen)
