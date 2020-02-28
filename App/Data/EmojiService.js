import * as emojisData from './emojis.json'
import emoji from 'emoji-datasource'
// import appleEmojis from 'emoji-datasource-apple/img/apple/64'

export const Categories = {
    all: {
        symbol: null,
        name: 'All'
    },
    history: {
        symbol: '🕘',
        name: 'Recently used'
    },
    emotion: {
        symbol: '😀',
        name: 'Smileys & Emotion'
    },
    people: {
        symbol: '🧑',
        name: 'People & Body'
    },
    nature: {
        symbol: '🦄',
        name: 'Animals & Nature'
    },
    food: {
        symbol: '🍔',
        name: 'Food & Drink'
    },
    activities: {
        symbol: '⚾️',
        name: 'Activities'
    },
    places: {
        symbol: '✈️',
        name: 'Travel & Places'
    },
    objects: {
        symbol: '💡',
        name: 'Objects'
    },
    symbols: {
        symbol: '🔣',
        name: 'Symbols'
    },
    flags: {
        symbol: '🏳️‍🌈',
        name: 'Flags'
    }
}

export const getLiveEmojis = () => {
    // Get live emojis
    const charFromUtf16 = utf16 => String.fromCodePoint(...utf16.split('-').map(u => '0x' + u))
    const charFromEmojiObject = obj => charFromUtf16(obj.unified)
    const filteredEmojis = emoji.filter(e => !e['obsoleted_by'] && e.has_img_apple)
    const emojiByCategory = category => filteredEmojis.filter(e => e.category === category)
    const sortEmoji = list => list.sort((a, b) => a.order - b.order)
    let emojis = emojiByCategory(Categories.people.name).map(item => ({
        emoji: charFromEmojiObject(item),
        order: item.sort_order
    }))
    // .filter(({ emoji }) => !badEmojis.includes(emoji))
    sortEmoji(emojis)
    return emojis
}

export const getEmojis = () => {
    return Object.values(emojisData)
}

export const printEmojis = () => {
    // console.log(`👨‍🌾 => `, appleEmojis)
    // console.log(JSON.stringify(getLiveEmojis()))
}
