// @flow
import React from 'react'
import { ScrollView } from 'react-native'
import { Metrics, Colors } from 'Themes'
import V from 'Components/V'
import CategoryCard, { CATEGORY_CARD_WIDTH, CATEGORY_CARD_MARGIN } from './CategoryCard'

const SNAP_INTERVAL = CATEGORY_CARD_WIDTH + CATEGORY_CARD_MARGIN

const CATEGORIES = [
    {
        name: 'Productivity',
        color: Colors.getColor('PastelRed')
    },
    {
        name: 'Mindfulness',
        color: Colors.getColor('PastelOrangeL')
    },
    {
        name: 'Mental',
        color: Colors.getColor('TealM')
    },
    {
        name: 'Physical',
        color: '#A8E7C1'
    },
    {
        name: 'Social',
        color: Colors.getColor('PastelPurplePink')
    }
]

const CategoryScoller = () => {
    return (
        <V mt={3} mb={3}>
            <ScrollView
                horizontal
                snapToAlignment="start"
                decelerationRate={0}
                snapToInterval={SNAP_INTERVAL}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginLeft: Metrics.padding.xLarge,
                    paddingRight: Metrics.padding.xLarge
                }}
            >
                {CATEGORIES.map(({ name, color }) => (
                    <CategoryCard {...{ name, color }} key={name} />
                ))}
            </ScrollView>
        </V>
    )
}

export default CategoryScoller
