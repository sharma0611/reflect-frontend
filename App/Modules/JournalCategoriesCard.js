// @flow
import React from 'react'
import { ScrollView } from 'react-native'
import { Metrics } from 'Themes'
import V from 'Components/V'
import JournalCategoryCard, { CATEGORY_CARD_WIDTH } from 'Modules/JournalCategoryCard'
import Prompts from 'Data/prompts'
import { withNavigation } from 'react-navigation'
import { arrayChunks } from 'utils'

const CHUNK_SIZE = 2
const CATEGORY_MARGIN = 2
const SNAP_INTERVAL = CATEGORY_CARD_WIDTH + Metrics.padding.scale[CATEGORY_MARGIN]

class JournalCategories extends React.Component<*> {
    renderCategory = (category, index) => {
        return <JournalCategoryCard {...{ category }} key={category.title} />
    }

    renderChunk = (chunk, chunkIndex) => {
        return (
            <V mr={CATEGORY_MARGIN} key={chunkIndex}>
                {chunk.map((prompt, index) =>
                    this.renderCategory(prompt, chunkIndex * CHUNK_SIZE + index)
                )}
            </V>
        )
    }

    render() {
        const categories = Prompts.getAllCategories()
        const categoryChunks = arrayChunks(categories, CHUNK_SIZE)
        return (
            <ScrollView
                horizontal
                snapToAlignment="start"
                decelerationRate={0}
                snapToInterval={SNAP_INTERVAL}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginLeft: Metrics.padding.medium,
                    paddingRight: Metrics.padding.medium,
                    marginBottom: Metrics.padding.small
                }}
            >
                {categoryChunks.map((chunk, index) => this.renderChunk(chunk, index))}
            </ScrollView>
        )
    }
}

export default withNavigation(JournalCategories)
