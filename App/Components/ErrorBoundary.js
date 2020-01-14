// @flow
import React from 'react'
import T from 'Components/T'
import V from 'Components/V'
import * as Sentry from '@sentry/react-native'

type Props = {
    children: React.Node
}

type State = {
    hasError: boolean
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
        Sentry.captureException(error)
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <V flex={1} jc="center" ai="center" bg="WhiteM">
                    <T>Sorry for the error! Please let us know in the feedback form.</T>
                </V>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
