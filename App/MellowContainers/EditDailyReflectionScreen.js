//@flow
import React, { useState, useEffect } from 'react'
import { Animated } from 'react-native'
import type AnimatedValue from 'react-native/Libraries/Animated/src/nodes/AnimatedValue'
import { Metrics, Colors } from 'Themes'
import T from 'Components/T'
import V from 'Components/V'
import Touchable from 'Components/Touchable'
import WaveBackground from 'MellowComponents/WaveBackground'
import LeftChevron from 'MellowComponents/LeftChevron'
import { withNavigation } from 'react-navigation'
import Card from 'MellowComponents/Card'
import ActivityResponse from 'Firebase/models/ActivityResponse'
import Profile from 'Firebase/models/Profile'
import Spinner from 'MellowComponents/Spinner'
import MainButton from 'MellowComponents/MainButton'
import ScrollingScreen from 'MellowComponents/ScrollingScreen'
import Switch from 'MellowComponents/Switch'
import useProfile from '../Hooks/useProfile'

const CIRCLE_SIZE = 12

const Row = ({ leftDotColor, title, active, onPress }) => {
    return (
        <V p={2} row ai="center" jc="center" key={title}>
            <V px={2}>
                <V
                    style={{
                        height: CIRCLE_SIZE,
                        width: CIRCLE_SIZE,
                        borderRadius: CIRCLE_SIZE / 2,
                        backgroundColor: leftDotColor
                    }}
                />
            </V>
            <T b1 color="Gray2" pl={1}>
                {title}
            </T>
            <V flex={1} />
            <Switch toggle={active} onPress={onPress} />
        </V>
    )
}

const Seperator = () => {
    return (
        <V flex={1} ai="center">
            <V
                style={{
                    width: Metrics.screenWidth - 5 * Metrics.padding.scale[3],
                    borderBottomWidth: 0.7,
                    opacity: 0.3,
                    borderBottomColor: Colors.Gray4
                }}
            />
        </V>
    )
}

const EditDailyReflectionScreen = ({ navigation }) => {
    const [{ loading, userSchema, dirty, schemaOptions }, setUserSchema] = useState({
        loading: true,
        dirty: false,
        userSchema: [],
        schemaOptions: []
    })
    const { hasPro } = useProfile()
    useEffect(() => {
        const loadSchema = async () => {
            const schemaOptions = await ActivityResponse.allSchemaOptions()
            const userSchema = await Profile.reflectionSchema()
            setUserSchema({ loading: false, schemaOptions, userSchema })
        }
        loadSchema()
    }, [])

    const isActive = scheme =>
        userSchema.some(
            userScheme =>
                (scheme.category && scheme.category === userScheme.category) ||
                (scheme.question && scheme.question === userScheme.question)
        )

    const toggleOption = (index, active) => {
        if (!hasPro) {
            navigation.navigate('MellowPaywall')
        } else {
            const newUserSchema = schemaOptions
                .map((scheme, schemeInd) => {
                    if (index === schemeInd) {
                        return { ...scheme, active: !active }
                    } else {
                        const active = isActive(scheme)
                        return { ...scheme, active }
                    }
                })
                .filter(({ active }) => active)
                .map(({ active, color, ...rest }) => rest)
            setUserSchema({ loading: false, dirty: true, schemaOptions, userSchema: newUserSchema })
        }
    }

    const options = schemaOptions.map(scheme => {
        const active = isActive(scheme)
        return { active, ...scheme }
    })

    const submit = async () => {
        await Profile.setReflectionScheme(userSchema)
        setTimeout(() => navigation.goBack(), 800)
    }

    return (
        <ScrollingScreen>
            <V p={4}>
                <LeftChevron />
            </V>
            <V p={4} pt={0}>
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <T heading3 color="Gray1" pb={3}>
                            Customize your reflection
                        </T>
                        <Card alt bg="WhiteM">
                            <V p={1} py={2}>
                                <V py={1}>
                                    {options.map(({ header, active, color }, index) => (
                                        <Row
                                            {...{
                                                leftDotColor: color ? color : Colors.PastelPurple,
                                                title: header,
                                                active,
                                                onPress: () => toggleOption(index, active)
                                            }}
                                        />
                                    ))}
                                </V>
                            </V>
                        </Card>
                        <V pt={4} ai="center">
                            <MainButton
                                onPress={submit}
                                disabled={!dirty || userSchema.length === 0}
                                text={`Submit`}
                                onePress
                            />
                        </V>
                    </>
                )}
            </V>
        </ScrollingScreen>
    )
}

export default withNavigation(EditDailyReflectionScreen)
