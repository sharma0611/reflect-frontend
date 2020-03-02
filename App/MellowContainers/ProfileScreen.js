// @flow
import React from 'react'
import V from 'Components/V'
import T from 'Components/T'
import Section from 'MellowComponents/Section'
import SectionHeader from 'MellowComponents/SectionHeader'
import ScrollingScreen from 'MellowComponents/ScrollingScreen'
import ProfileCard from '../MellowModules/ProfileCard'

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
            </Section>
        </ScrollingScreen>
    )
}

ProfileScreen.navigationOptions = {
    header: null
}

export default ProfileScreen
