// @flow
import firestore from '@react-native-firebase/firestore'
import Model from './Model'

const COLLECTION_NAME = 'questions'

export type QuestionFields = {
    id: string,
    categoryId: string,
    order: number,
    questionText: string
}

// Category Ids
const POSITIVE = 'positive'
const NEGATIVE = 'negative'

class QuestionModel extends Model {
    greaterRandomQuery(key: firestore.DocumentId, categoryId: string): firestore.Query {
        return this.collectionRef
            .where('categoryId', '==', categoryId)
            .where(firestore.FieldPath.documentId(), '>=', key)
            .limit(1)
    }

    lesserRandomQuery(key: firestore.DocumentId, categoryId: string): firestore.Query {
        return this.collectionRef
            .where('categoryId', '==', categoryId)
            .where(firestore.FieldPath.documentId(), '<', key)
            .limit(1)
    }

    getRandomQuestion = async (categoryId: string): Promise<QuestionFields> => {
        const key = this.newDocRef().id
        const greaterData = await this.dataFromQuery(this.greaterRandomQuery(key, categoryId))
        let question
        if (greaterData.length > 0) {
            question = greaterData[0]
        } else {
            const lesserData = await this.dataFromQuery(this.lesserRandomQuery(key, categoryId))
            question = lesserData[0]
        }
        return question
    }

    getRandomPositive = (): Promise<QuestionFields> => {
        return this.getRandomQuestion(POSITIVE)
    }

    getRandomNegative = (): Promise<QuestionFields> => {
        return this.getRandomQuestion(NEGATIVE)
    }
}

const Question = new QuestionModel(COLLECTION_NAME)
export default Question
