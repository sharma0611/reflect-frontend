// @flow
import React from 'react'
import T from 'Components/T'
import V from 'Components/V'
import * as Sentry from '@sentry/react-native'
import SecondaryButton from 'MellowComponents/SecondaryButton'
import Profile from 'Firebase/models/Profile'
import ErrorScreen from 'MellowContainers/ErrorScreen'

type Props = {
    children: React.Node
}

type State = {
    hasError: boolean,
    error?: string
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        this.setState({ error })
        Sentry.captureException(error)
    }

    handleSignOut() {
        Profile.signOut()
    }

    render() {
        if (this.state.hasError) {
            const { error } = this.state
            // You can render any custom fallback UI
            return <ErrorScreen {...{ error }} />
        }

        return this.props.children
    }
}

export default ErrorBoundary
