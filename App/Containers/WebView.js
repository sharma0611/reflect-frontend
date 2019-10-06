// @flow
// simple web view wrapper to be
// accessed from the navigator
import React, { Component } from 'react'
import { WebView } from 'react-native-webview'
import Screen from 'Components/Screen'
import Header from 'Components/Header'
import Analytics from 'Controllers/AnalyticsController'

class WebViewWrapper extends Component {
    componentDidMount() {
        const { state, setParams, navigate } = this.props.navigation
        const params = state.params
        Analytics.openWebView(params.url)
    }

    render() {
        const { state, setParams, navigate } = this.props.navigation
        const params = state.params
        return (
            <Screen mt={4}>
                <WebView source={{ uri: params.url }} />
                <Header />
            </Screen>
        )
    }
}

export default WebViewWrapper
