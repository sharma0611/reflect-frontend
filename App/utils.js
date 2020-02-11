// @flow
import moment from 'moment'

export const utcToLocalTime = (hours: number, minutes: number) => {
    const date = moment
        .utc()
        .hour(hours)
        .minute(minutes)
    const local = date.local()
    return { hours: local.hour(), minutes: local.minute() }
}

export const localToUtcTime = (hours: number, minutes: number) => {
    const date = moment()
        .hour(hours)
        .minute(minutes)
    const utc = moment.utc(date)
    return { hours: utc.hour(), minutes: utc.minute() }
}

export const arrayChunks = (array, chunk_size) =>
    Array(Math.ceil(array.length / chunk_size))
        .fill()
        .map((_, index) => index * chunk_size)
        .map(begin => array.slice(begin, begin + chunk_size))
