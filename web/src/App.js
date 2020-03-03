import React from 'react'
import { Router } from '@reach/router'
import ComeBackSoon from './pages/ComeBackSoon'

export default function App() {
    return (
        <Router>
            <ComeBackSoon path="/" />
        </Router>
    )
}
