// @flow
import * as React from 'react'
import T from 'Components/T'
import V from 'Components/V'
import TouchableCard from 'Components/TouchableCard'

const JournalPromptCard = ({ prompt, whiteBg, ...rest }) => {
    return (
        <TouchableCard px={3} py={2} my={1} gradient={!whiteBg} {...rest}>
            <V row py={1}>
                <V flex={8}>
                    <T color={whiteBg ? 'GreyD' : 'WhiteM'}>{prompt}</T>
                </V>
                <V flex={1}>
                    <T ta="right" color={whiteBg ? 'GreyD' : 'WhiteM'}>
                        >
                    </T>
                </V>
            </V>
        </TouchableCard>
    )
}

export default JournalPromptCard
