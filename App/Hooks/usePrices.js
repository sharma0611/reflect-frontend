import { useState, useEffect } from 'react'
import * as Sentry from '@sentry/react-native'
import { getPrices } from 'Controllers/PurchasesController'

export default function usePrices() {
    const [{ loading, error, prices }, setPrices] = useState({
        loading: true,
        error: false
    })
    useEffect(() => {
        const loadData = async () => {
            try {
                const prices = await getPrices()
                setPrices({ prices, loading: false, error: false })
            } catch (e) {
                setPrices({
                    entitlements: undefined,
                    loading: false,
                    error: 'Error: Could not load purchases'
                })
                Sentry.captureException(e)
            }
        }
        loadData()
    }, [])
    return { loading, error, prices }
}
