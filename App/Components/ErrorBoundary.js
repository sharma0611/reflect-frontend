// @flow
import React from 'react'
import T from 'Components/T'
import V from 'Components/V'
import * as Sentry from '@sentry/react-native'
import SecondaryButton from 'MellowComponents/SecondaryButton'
import Profile from 'Firebase/models/Profile'

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

    handleSignOut() {
        Profile.signOut()
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <V flex={1} p={4} jc="center" ai="center" bg="WhiteM">
                    <T heading pb={4}>
                        Sorry for the error! Please let us know in the feedback form on the main
                        screen or text me at 6479380024.
                    </T>
                    <SecondaryButton onPress={this.handleSignOut} text={'Sign out'} />
                </V>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
