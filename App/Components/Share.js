/* @flow */
import React from 'react'
import { Share } from 'react-native'
import Analytics from 'Controllers/AnalyticsController'
import Touchable from 'Components/Touchable'

type Props = {
    children?: React.Node,
    content: any,
    sharedVia: string,
    onPress: Function
}

class ShareComponent extends React.Component<Props> {
    onShare = async () => {
        this.props.onPress && this.props.onPress()
        Analytics.openShare()
        const shared = await Share.share(this.props.content)
        const { action } = shared
        if (action !== Share.dismissedAction) {
            Analytics.hasShared()
        }
    }

    render() {
        const { children } = this.props
        return <Touchable onPress={this.onShare}>{children}</Touchable>
    }
}

export default ShareComponent
