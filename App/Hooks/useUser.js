import { useGlobal, useEffect } from 'reactn'
import Profile from 'Firebase/models/Profile'

export const USER = 'user'
export const initialUserState = { loading: true, hasPro: false, uid: undefined }

export function setupUser() {
    const [{ loading, hasPro, uid }, setUser] = useGlobal(USER)

    const refetch = async user => {
        let { hasPro, uid } = initialUserState
        if (user) {
            const { uid } = user
            const hasPro = await Profile.pro(uid)
            return setUser({ loading: false, hasPro, uid })
        } else {
            return setUser({ loading: false, hasPro, uid })
        }
    }

    useEffect(() => {
        const unsubscribe = Profile.listenToAuthState(refetch)
        return unsubscribe
    }, [])

    return { loading, uid, hasPro }
}

const useUser = () => {
    const [{ loading, hasPro, uid }, setUser] = useGlobal(USER)
    return { loading, uid, hasPro }
}

export default useUser
