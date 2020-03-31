import { useGlobal, useEffect } from 'reactn'
import Profile from 'Firebase/models/Profile'

export const USER = 'user'
export const initialUserState = { loading: true, hasPro: false, pin: undefined, uid: undefined }

export function setupUser() {
    const [{ loading, hasPro, uid, pin }, setUser] = useGlobal(USER)

    const refetch = async user => {
        let { hasPro, uid, pin } = initialUserState
        if (user) {
            const { uid } = user
            const hasPro = await Profile.pro(uid)
            const pin = await Profile.getPin(uid)
            return setUser({ loading: false, hasPro, uid, pin })
        } else {
            return setUser({ loading: false, hasPro, uid, pin })
        }
    }

    useEffect(() => {
        const unsubscribe = Profile.listenToAuthState(refetch)
        return unsubscribe
    }, [])

    return { loading, uid, hasPro, pin }
}

const useUser = () => {
    const [{ loading, hasPro, uid, pin }, setUser] = useGlobal(USER)
    return { loading, uid, hasPro, pin }
}

export const usePin = () => {
    const [{ loading, hasPro, uid, pin }, setUser] = useGlobal(USER)
    const setPin = newPin => setUser({ loading, hasPro, uid, pin: newPin })
    return [{ hasPro, pin }, setPin]
}

export default useUser
