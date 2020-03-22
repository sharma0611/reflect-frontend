// @flow
import Model from './Model'

const COLLECTION_NAME = 'questions'

export type QuestionFields = {
    id: string,
    categoryId: string,
    order: number,
    questionText: string
}

class QuestionModel extends Model {}

const Question = new QuestionModel(COLLECTION_NAME)
export default Question
