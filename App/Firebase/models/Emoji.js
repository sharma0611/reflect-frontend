// @flow
import firestore from '@react-native-firebase/firestore'
import Model from './Model'

const COLLECTION_NAME = 'emojis'

export type EmojiFields = {
    id: string,
    order: number,
    positivity: number,
    emoji: string
}

class EmojiModel extends Model {
    emojiQuery(): firestore.Query {
        return this.collectionRef.orderBy('order')
    }

    emojis() {
        return this.dataFromQuery(this.emojiQuery())
    }
}

const Question = new EmojiModel(COLLECTION_NAME)
export default Question
