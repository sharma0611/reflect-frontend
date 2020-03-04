import { useState, useEffect } from 'react'
import { auth } from '../Controllers/FirebaseController'
import { hasProByUid } from '../Controllers/PurchasesController'

/**
 * returns user state
 * @param {Boolean} listen Specifies if data is refetched when the firebase currentUser changes
 * @returns {{ loading, hasPro, uid, refetch }}
 */
export default function useUser({ listen = false, timeout = undefined }) {
    const [{ loading, hasPro, uid }, setUser] = useState({
        loading: true,
        hasPro: false,
        uid: undefined
    })

    const setUserTimeout = user => {
        setUser({ loading: true, hasPro, uid })
        const timer = setTimeout(() => {
            setUser(user)
        }, timeout)
        return () => clearTimeout(timer)
    }

    const refetch = async () => {
        const { uid } = auth.currentUser || {}
        const hasPro = await hasProByUid(uid)
        const setter = timeout ? setUserTimeout : setUser
        return setter({ loading: false, hasPro, uid })
    }

    useEffect(() => {
        if (listen) return auth.onAuthStateChanged(refetch)
        return refetch()
    }, [])

    return { loading, uid, hasPro, refetch }
}
