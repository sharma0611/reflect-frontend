// @flow
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'
import Model from './Model'
import Profile from './Profile'
import Entry, { DAILY_MOOD, DAILY_MOOD_FOLLOW_UP } from './Entry'
import Question, { POSITIVE, NEGATIVE } from './Question'
import { Colors } from 'Themes'
import { summary } from 'date-streaks'
import type { PaginatedResponse } from './Types'
import type { EntryFields } from './Entry'
import Category from './Category'

const COLLECTION_NAME = 'activity_responses'

export type ActivityResponseFields = {
    activityType: string,
    color: string,
    entryIds: Array<string>,
    name: string,
    timestamp: Date,
    uid: string
}

export type ActivityResponseWithEntriesFields = {
    activityType: string,
    color: string,
    entries: Array<EntryFields>,
    name: string,
    timestamp: Date,
    uid: string,
    // post save
    id?: string
}

// disjoint union with exact types
export type QuestionScheme = {|
    question: string,
    header: string
|}

export type CategoryScheme = {|
    category: string,
    header?: string
|}

export type Scheme = QuestionScheme | CategoryScheme

// Activity Types
const DAILY = 'daily'

class ActivityResponseModel extends Model {
    _getResponsesWithEntries = (
        responses: Array<ActivityResponseFields>
    ): Promise<Array<ActivityResponseWithEntriesFields>> => {
        return new Promise.all(
            responses.map(async response => {
                const responseWithEntry = await this._getResponseWithEntries(response)
                return responseWithEntry
            })
        )
    }

    _getResponseWithEntries = async (
        response: ActivityResponseFields
    ): Promise<ActivityResponseWithEntriesFields> => {
        const { entryIds, ...rest } = response
        const entries = await Entry.dataFromIds(entryIds)
        const activity = { ...rest, entries }
        return activity
    }

    userActivityResponsesQuery(): firestore.Query {
        const uid = Profile.uid()
        return this.collectionRef.where('uid', '==', uid).orderBy('timestamp', 'desc')
    }

    userStreakQuery(): firestore.Query {
        const uid = Profile.uid()
        return this.collectionRef.where('uid', '==', uid).where('activityType', '==', DAILY)
    }

    numberSaved = async (): Promise<number> => {
        const data = await this.dataFromQuery(this.userActivityResponsesQuery())
        return data.length
    }

    dailyReflectionQuery(date: Date): firestore.Query {
        const uid = Profile.uid()
        const start = moment(date)
            .startOf('day')
            .toDate()
        const end = moment(date)
            .endOf('day')
            .toDate()
        return this.collectionRef
            .where('uid', '==', uid)
            .where('timestamp', '>=', start)
            .where('timestamp', '<', end)
            .where('activityType', '==', DAILY)
            .limit(1)
    }

    userStreakData(): Promise<Array<ActivityResponseFields>> {
        return this.dataFromQuery(this.userStreakQuery())
    }

    currentStreak = async (): Promise<number> => {
        const data = await this.userStreakData()
        const dates = data.map(({ timestamp }) => {
            const date = moment(timestamp).format('MM/DD/YY')
            return new Date(date)
        })
        const { currentStreak } = summary({
            dates
        })
        return currentStreak
    }

    paginatedResponses = (
        limit: number,
        startAfter?: firestore.DocumentSnapshot
    ): Promise<PaginatedResponse> => {
        return this.dataFromPaginatedQuery(this.userActivityResponsesQuery(), limit, startAfter)
    }

    paginatedResponsesWithEntries = async (
        limit: number,
        startAfter?: firestore.DocumentSnapshot
    ): Promise<PaginatedResponse> => {
        const { data, lastDoc } = await this.paginatedResponses(limit, startAfter)
        const responsesWithEntries = await this._getResponsesWithEntries(data)
        return { data: responsesWithEntries, lastDoc }
    }

    listenToDailyReflectionCompleted(onData: (data: boolean) => void, onError: () => void) {
        const date = new Date()
        const onReflectionData = (reflectionData: Array<ActivityResponseFields>) => {
            const reflectionCompleted = reflectionData.length === 1
            onData(reflectionCompleted)
        }
        return this.listenToQuery(this.dailyReflectionQuery(date), onReflectionData, onError)
    }

    isDailyReflectionCompleted = async (date: Date) => {
        const data = await this.dataFromQuery(this.dailyReflectionQuery(date))
        return data.length === 1
    }

    defaultReflectionSchema = (): Array<Scheme> => {
        return [
            { question: DAILY_MOOD, header: 'Daily Mood' },
            { question: DAILY_MOOD_FOLLOW_UP, header: 'Mood Follow Up' },
            { category: NEGATIVE, header: 'Retrospective' },
            { category: POSITIVE, header: 'Positive' }
        ]
    }

    proCategorySchemaOptions = async (): Promise<Array<Scheme>> => {
        const reflectionCategories = await Category.getReflectionCategories()
        return reflectionCategories.map(({ id: category, name: header }) => ({ category, header }))
    }

    allSchemaOptions = async (): Promise<Array<Scheme>> => {
        const defaultSchema = this.defaultReflectionSchema()
        const categorySchema = await this.proCategorySchemaOptions()
        return [...defaultSchema, ...categorySchema]
    }

    _resolveSchemeToEntry = async (scheme: Scheme, date: Date): Promise<EntryFields | void> => {
        if (scheme.question) {
            const { question, header } = scheme
            if (question === DAILY_MOOD) {
                let moodEntry = await Entry.mood(date)
                if (!moodEntry) {
                    moodEntry = Entry.emptyMood(date)
                }
                return { ...moodEntry, header }
            } else if (question === DAILY_MOOD_FOLLOW_UP) {
                const entry = {
                    questionText: 'What made me feel this way?',
                    categoryId: DAILY_MOOD_FOLLOW_UP,
                    header
                }
                return entry
            }
        }
        if (scheme.category) {
            const { category, header } = scheme
            const { id, order, ...question } = await Question.getRandomQuestion(category)
            let useHeader
            if (header) {
                useHeader = header
            } else {
                useHeader = await Category.getCategoryName(category)
            }
            const entry = { ...question, header: useHeader }
            return entry
        }
    }

    _resolveSchemaToEntries = (
        schema: Array<Scheme>,
        date: Date
    ): Promise<Array<EntryFields | void>> => {
        return new Promise.all(schema.map(scheme => this._resolveSchemeToEntry(scheme, date)))
    }

    dailyReflection = async (date: Date) => {
        // check if daily reflection exists
        const data = await this.dataFromQuery(this.dailyReflectionQuery(date))

        if (data.length === 1) {
            return data[0]
        } else {
            // otherwise create one
            const schema = this.defaultReflectionSchema()
            const entries = await this._resolveSchemaToEntries(schema, date)
            const dailyReflection = {
                entries,
                name: 'Daily Reflection',
                color: Colors.PastelPurple,
                activityType: DAILY
            }
            return dailyReflection
        }
    }

    upsert = async (
        activity: ActivityResponseWithEntriesFields,
        date?: Date
    ): Promise<ActivityResponseWithEntriesFields> => {
        const { id, entries, ...rest } = activity
        const uid = Profile.uid()

        let timestamp = new Date()
        if (date) {
            timestamp = date
        }

        // set all entries
        const entriesWithIds = await new Promise.all(
            entries.map(entry => Entry.upsert(entry, timestamp))
        )
        const entryIds = entriesWithIds.map(({ id }) => id)

        // set activity responses with entry IDS
        const activityResponse = { ...rest, entryIds, uid }
        let docRef
        if (id) {
            docRef = await this.updateById(id, activityResponse)
        } else {
            docRef = await this.create({ ...activityResponse, timestamp })
        }
        const savedActivityResponse = await this.dataFromDocRef(docRef)

        const { entryIds: ids, ...restOfActivity } = savedActivityResponse
        return { ...restOfActivity, entries: entriesWithIds }
    }

    relatedResponsesQuery = (entryId: string) => {
        const uid = Profile.uid()
        return this.collectionRef
            .where('uid', '==', uid)
            .where('entryIds', 'array-contains', entryId)
    }

    cascadingDelete = async (id: string): Promise<void> => {
        const { entryIds } = await this.dataFromId(id)
        await Entry.deleteByIds(entryIds)
        await this.deleteById(id)
    }
}

const ActivityResponse = new ActivityResponseModel(COLLECTION_NAME)
export default ActivityResponse
