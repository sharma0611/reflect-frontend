// @flow
import React from 'react'
import V from 'Components/V'
import T from 'Components/T'
import Section from 'MellowComponents/Section'
import SectionHeader from 'MellowComponents/SectionHeader'
import ScrollingScreen from 'MellowComponents/ScrollingScreen'
import ProfileCard from '../MellowModules/ProfileCard'
import MissionCard from '../MellowModules/MissionCard'

const ProfileScreen = () => {
    return (
        <ScrollingScreen>
            <Section>
                <T heading3 color="Gray2">
                    My Profile
                </T>
                <V pt={3}>
                    <ProfileCard />
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
            <V flex={1} jc="flex-end" pb={3}>
                <T ta="center" b1 color="Gray3">
                    Made with ❤️ in Waterloo, Canada
                </T>
            </V>
        </ScrollingScreen>
    )
}

ProfileScreen.navigationOptions = {
    header: null
}

export default ProfileScreen
