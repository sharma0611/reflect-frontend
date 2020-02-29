// @flow
import React from 'react'
import ScrollingScreen from 'MellowComponents/ScrollingScreen'
import Section from 'MellowComponents/Section'
import MainButton from '../MellowComponents/MainButton'
import V from '../Components/V'
import { signOut, deleteUser } from '../Controllers/FirebaseController'

export default function ProfileScreen({ navigation }) {
    const handleSignOut = async () => {
        await signOut()
        navigation.navigate('Onboarding')
    }

    const handleDelete = async () => {
        await deleteUser()
        navigation.navigate('Onboarding')
    }

    return (
        <ScrollingScreen>
            <Section>
                <V ai="center">
                    <MainButton text={'Sign Out'} onPress={handleSignOut} />
                </V>
            </Section>
            <Section>
                <V ai="center">
                    <MainButton text={'Delete Account'} onPress={handleDelete} />
                </V>
            </Section>
        </ScrollingScreen>
    )
}
