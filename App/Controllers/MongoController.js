// @flow
import Datastore from 'react-native-local-mongodb'
import Analytics from 'Controllers/AnalyticsController'

// Mongo DB Types
const JOURNAL = 'JOURNAL'
const DAILY_MOOD = 'DAILY_MOOD'
const PUSH_RECEIPTS = 'PUSH_RECEIPTS'
const DAILY_GOALS = 'DAILY_GOALS'
export const DAILY_REFLECTION = 'DAILY_REFLECTION'
export const CUSTOM = 'CUSTOM'
export const PROMPT = 'PROMPT'

class MongoController {
    constructor() {
        const journalDb = new Datastore({
            filename: JOURNAL,
            autoload: true
        })
        const dailyMoodDb = new Datastore({
            filename: DAILY_MOOD,
            autoload: true
        })
        const pushReceiptsDb = new Datastore({
            filename: PUSH_RECEIPTS,
            autoload: true
        })
        const dailyGoalsDb = new Datastore({
            filename: DAILY_GOALS,
            autoload: true
        })
        dailyMoodDb.ensureIndex({ fieldName: 'date', unique: true })

        this.journalDb = journalDb
        this.dailyMoodDb = dailyMoodDb
        this.pushReceiptsDb = pushReceiptsDb
        this.dailyGoalsDb = dailyGoalsDb

        // this._clearDb(this.dailyGoalsDb)
    }

    // Helpers

    _clearDb(db) {
        db.remove({}, { multi: true })
    }

    // Mood
    async insertDailyMood(date: Date, emoji: string) {
        const db = this.dailyMoodDb
        date.setHours(0, 0, 0, 0)
        const dailyMood = { date, emoji }
        Analytics.saveDailyMood(emoji)
        await db.update({ date }, dailyMood, { upsert: true })
    }

    getDailyMood(date) {
        date.setHours(0, 0, 0, 0)
        const db = this.dailyMoodDb
        return new Promise((resolve, reject) => {
            db.findOne({ date }).exec(function(err, docs) {
                if (err) {
                    reject(err)
                }
                resolve(docs)
            })
        })
    }

    // Journals
    clearJournals() {
        const db = this.journalDb
        this._clearDb(db)
    }

    insertJournal(title, text, journalType, date) {
        if (text) {
            const db = this.journalDb
            const today = date ? date : new Date()
            const timestamp = today.getTime()
            today.setHours(0, 0, 0, 0)
            const journal = { date: today, title, text, journalType, timestamp }
            Analytics.saveJournal(journalType, text.length, title)
            db.insert(journal)
        }
    }

    isDailyQuestionCompleted = (title, date) => {
        return new Promise((resolve, reject) => {
            const db = this.journalDb
            const today = date ? date : new Date()
            today.setHours(0, 0, 0, 0)
            db.count({ date: today, journalType: DAILY_REFLECTION, title }, function(err, count) {
                if (err) {
                    reject(err)
                }
                if (count > 0) {
                    resolve(true)
                }
                resolve(false)
            })
        })
    }

    getDailyQuestionJournal = (title, date) => {
        return new Promise((resolve, reject) => {
            const db = this.journalDb
            const today = date ? date : new Date()
            today.setHours(0, 0, 0, 0)
            db.findOne({ date: today, journalType: DAILY_REFLECTION, title }, function(err, docs) {
                if (err) {
                    resolve({})
                }
                if (docs) {
                    resolve(docs)
                }
                resolve({})
            })
        })
    }

    isDailyReflectionCompleted = () => {
        return new Promise((resolve, reject) => {
            const db = this.journalDb
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            db.count({ date: today, journalType: DAILY_REFLECTION }, function(err, count) {
                if (err) {
                    reject(err)
                }
                if (count > 0) {
                    resolve(true)
                }
                resolve(false)
            })
        })
    }
    async updateJournal(id, title, text) {
        const db = this.journalDb
        const journal = { title, text }
        Analytics.updateJournal()
        await db.update({ _id: id }, { $set: journal })
    }

    async deleteJournal(id) {
        const db = this.journalDb
        Analytics.deleteJournal()
        await db.remove({ _id: id })
    }

    getAllJournals() {
        const db = this.journalDb
        return new Promise((resolve, reject) => {
            db.find({}).exec(function(err, docs) {
                if (err) {
                    reject(err)
                }
                resolve(docs)
            })
        })
    }

    _getJournals(skip, limit) {
        const db = this.journalDb
        return new Promise((resolve, reject) => {
            db.find({})
                .sort({ date: -1 })
                .skip(skip)
                .limit(limit)
                .exec(function(err, docs) {
                    if (err) {
                        reject(err)
                    }
                    resolve(docs)
                })
        })
    }

    async *journalGenerator(pageSize, onFinish) {
        let skip = 0
        let limit = pageSize
        while (true) {
            let docs = await this._getJournals(skip, limit)
            if (docs.length === 0) {
                await onFinish()
                break
            }
            yield docs
            skip = skip + limit
        }
    }

    // Pushes
    clearPushReceipts() {
        const db = this.pushReceiptsDb
        this._clearDb(db)
    }

    markDailyReflectionPushSent() {
        return new Promise((resolve, reject) => {
            const db = this.pushReceiptsDb
            const date = new Date()
            const timestamp = date.getTime()
            date.setHours(0, 0, 0, 0)
            const receipt = { date, timestamp, pushType: DAILY_REFLECTION }
            db.insert(receipt, function(err, newDoc) {
                if (err) {
                    reject(err)
                }
                resolve(newDoc)
            })
        })
    }

    isDailyReflectionPushSent = () => {
        return new Promise((resolve, reject) => {
            const db = this.pushReceiptsDb
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            db.count({ date: today, pushType: DAILY_REFLECTION }, function(err, count) {
                if (err) {
                    reject(err)
                }
                if (count > 0) {
                    resolve(true)
                }
                resolve(false)
            })
        })
    }

    // Daily Goals
    fetchDailyGoals = (date: Date) => {
        return new Promise((resolve, reject) => {
            const db = this.dailyGoalsDb
            date.setHours(0, 0, 0, 0)
            db.find({ date })
                .sort({ idx: 1 })
                .exec((err, docs) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(docs)
                })
        })
    }

    fetchRecentGoals = () => {
        return new Promise((resolve, reject) => {
            const db = this.dailyGoalsDb
            db.find({})
                .limit(50)
                .sort({ date: -1, idx: 1 })
                .exec((err, docs) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(docs)
                })
        })
    }

    setDailyGoals = (date: Date, goals: Array<Goal>) => {
        return new Promise.all(goals.map(goal => this.setDailyGoal(date, goal)))
    }

    deleteDailyGoal = (date: Date, _id: ID) => {
        const db = this.dailyGoalsDb
        return db.remove({ _id })
    }

    setDailyGoal = (date: Date, goal: Goal) => {
        date.setHours(0, 0, 0, 0)
        return new Promise((resolve, reject) => {
            const db = this.dailyGoalsDb
            const { _id } = goal
            const { focus, ...rest } = goal
            goal = { date, ...rest }
            if (_id == null) {
                Analytics.saveDailyGoal()
                db.insert(goal, (err, newDoc) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(newDoc)
                })
            } else {
                db.update(
                    { _id },
                    { $set: goal },
                    { returnUpdatedDocs: true },
                    (err, numAffected, affectedDoc, upsert) => {
                        if (err) {
                            reject(err)
                        }
                        Analytics.updateDailyGoal(_id, goal.text.length)
                        resolve(affectedDoc)
                    }
                )
            }
        })
    }
}

type Goal = {
    _id: ID,
    idx: number,
    text: string
}

export default new MongoController()
