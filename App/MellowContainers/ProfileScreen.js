// @flow
import React from 'react'
import V from 'Components/V'
import T from 'Components/T'
import Section from 'MellowComponents/Section'
import SectionHeader from 'MellowComponents/SectionHeader'
import ScrollingScreen from 'MellowComponents/ScrollingScreen'
import ProfileCard from '../MellowModules/ProfileCard'
import MissionCard from '../MellowModules/MissionCard'
import Loading from '../MellowComponents/Loading'
import ErrorScreen from '../MellowContainers/ErrorScreen'
import useProfile from '../Hooks/useProfile'
import withPinProtection from 'HOC/withPinProtection'
import Terms from 'MellowComponents/Terms'

const ProfileScreen = () => {
    const { loading, error, profile } = useProfile()
    if (loading) return <Loading />
    if (error) return <ErrorScreen {...{ error }} />
    return (
        <ScrollingScreen>
            <Section>
                <T heading3 color="Gray2">
                    My Profile
                </T>
                <V pt={3}>
                    <ProfileCard {...{ profile }} />
                </V>
            </Section>
            <Section>
                <SectionHeader
                    {...{
                        header: 'Join our mission'
                    }}
                />
                <V pt={3}>
                    <MissionCard />
                </V>
            </Section>
            <V flex={1} jc="flex-end" pb={3} pt={2}>
                <T ta="center" b1 color="Gray3">
                    Made with ❤️ in Waterloo, Canada
                </T>
                <V>
                    <Terms />
                </V>
            </V>
        </ScrollingScreen>
    )
}

ProfileScreen.navigationOptions = {
    header: null
}

export default withPinProtection(ProfileScreen)
