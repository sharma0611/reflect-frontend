// @flow
import React from 'react'
import V from 'Components/V'
import JournalPromptCard from 'Modules/JournalPromptCard'
import Prompts from 'Data/prompts'
import { withNavigation } from 'react-navigation'
import MongoController from 'Controllers/MongoController'

class JournalPrompts extends React.Component<*> {
    saveJournal = (title, text) => {
        const { category } = this.props
        MongoController.insertJournal(title, text, category)
        this.props.navigation.goBack(null)
    }

    render() {
        let { numPrompts, onPressMore, category, hasPro } = this.props
        const prompts = Prompts.getPromptsForCategory(category)
        const color = Prompts.getCategoryColor(category)
        if (hasPro) {
            numPrompts = prompts.length
        }
        return (
            <V>
                {prompts.slice(0, numPrompts).map((prompt, index) => (
                    <JournalPromptCard
                        whiteBg
                        bg="WhiteM"
                        key={index}
                        prompt={prompt}
                        onPress={() =>
                            this.props.navigation.navigate('Journal', {
                                title: prompt,
                                onRightAction: this.saveJournal,
                                rightActionText: 'Save',
                                headerColor: color
                            })
                        }
                    />
                ))}
                {!hasPro && (
                    <JournalPromptCard
                        bg={'BrandM'}
                        key="more"
                        prompt={'More...'}
                        onPress={onPressMore}
                    />
                )}
            </V>
        )
    }
}

export default withNavigation(JournalPrompts)
