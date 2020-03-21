import { useGlobal, useEffect } from 'reactn'
import Profile from 'Firebase/models/Profile'

export const USER = 'user'
export const initialUserState = { loading: true, hasPro: false, uid: undefined }
/**
 * returns user state
 * @param {Boolean} listen Specifies if data is refetched when the firebase currentUser changes
 * @returns {{ loading, hasPro, uid, refetch }}
 */
export default function useUser({ listen = false, timeout = undefined }) {
    const [{ loading, hasPro, uid }, setUser] = useGlobal(USER)

    const setUserTimeout = user => {
        setUser({ loading: true, hasPro, uid })
        const timer = setTimeout(() => {
            setUser(user)
        }, timeout)
        return () => clearTimeout(timer)
    }

    const refetch = async () => {
        const uid = Profile.uid()
        const hasPro = await Profile.pro()
        const setter = timeout ? setUserTimeout : setUser
        return setter({ loading: false, hasPro, uid })
    }

    useEffect(() => {
        if (listen) return Profile.listenToAuthState(refetch)
        return refetch()
    }, [])

    return { loading, uid, hasPro, refetch }
}
