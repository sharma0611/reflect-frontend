import React from 'react'
import { signInWithGoogle, signOut } from '../firebase'
import { useAdmin } from '../hooks'

export default function Home() {
    const { admin, initializing } = useAdmin()
    if (initializing) return <div>Loading...</div>

    if (!admin)
        return (
            <div>
                <button onClick={signInWithGoogle}>Sign In</button>
            </div>
        )

    return (
        <div>
            {`Hello ${admin.email}`}
            <button onClick={signOut}>Sign Out</button>
        </div>
    )
}
