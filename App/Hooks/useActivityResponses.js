import { useState, useEffect } from 'react'
import { fetchActivityResponsesDocs, getDataFromDocWithId } from '../Controllers/FirebaseController'
import * as Sentry from '@sentry/react-native'

const LIMIT = 1

export default function useActivityResponses() {
    const initialState = {
        loading: true,
        error: false,
        activityResponses: [],
        lastDoc: undefined,
        hasMore: true
    }
    const [
        { loading, error, activityResponses, hasMore, lastDoc },
        setActivityResponses
    ] = useState(initialState)

    // managing subscriptions
    // const [subscriptions, setSubscriptions] = useState([])
    // const unsubscribeAll = () => {
    //     subscriptions.map(unsubscribe => unsubscribe())
    // }

    // const fetchActivities = querySnapshot => {
    //     let currActivityResponses = []
    //     querySnapshot.docs.map((doc, index) => {
    //         const activity = getDataFromDocWithId(doc)
    //         currActivityResponses.push(activity)
    //         if (index === querySnapshot.docs.length - 1) {
    //             setLastDoc(doc)
    //         }
    //     })
    //     setActivityResponses({
    //         activityResponses: [...activityResponses, ...currActivityResponses],
    //         loading: false,
    //         error: false
    //     })
    //     if (querySnapshot.docs.length < LIMIT) {
    //         setHasMore(false)
    //     }
    // }

    const load = async () => {
        let currActivityResponses = []
        let currHasMore = true
        let currLastDoc = undefined
        const docs = await fetchActivityResponsesDocs(LIMIT, lastDoc)
        if (docs.length < LIMIT) {
            currHasMore = false
        }
        docs.map((doc, index) => {
            const activity = getDataFromDocWithId(doc)
            currActivityResponses.push(activity)
            if (index === docs.length - 1) {
                currLastDoc = doc
            }
        })
        setActivityResponses({
            activityResponses: [...activityResponses, ...currActivityResponses],
            loading: false,
            error: false,
            hasMore: currHasMore,
            lastDoc: currLastDoc
        })
    }

    const loadMore = async () => {
        if (loading || !hasMore) {
            return
        }
        await load()
    }

    const refetch = async () => {
        setActivityResponses(initialState)
        await load()
    }

    const onError = err => {
        setActivityResponses({
            activityResponses: undefined,
            loading: false,
            hasMore: false,
            lastDoc: undefined,
            error: 'Error: ActivityResponses not found.'
        })
        Sentry.captureException(err)
    }

    useEffect(() => {
        try {
            load()
        } catch (e) {
            onError(e)
        }
    }, [])
    console.log({ loading, error, activityResponses, hasMore, lastDoc })
    return { loading, error, loadMore, refetch, activityResponses }
}
