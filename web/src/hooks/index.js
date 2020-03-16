import { useState, useEffect } from 'react'
import { auth, adminRefFromId } from '../firebase'

export function useAdmin() {
    const [loading, setLoading] = useState(true)
    const [admin, setAdmin] = useState(null)

    const handler = user => {
        if (!user) {
            setAdmin(null)
            setLoading(false)
            return
        }

        return adminRefFromId(user.uid).onSnapshot(doc => {
            setAdmin(doc.data())
            if (loading) setLoading(false)
        })
    }

    useEffect(() => auth.onAuthStateChanged(handler), [])

    return { admin, loading }
}
