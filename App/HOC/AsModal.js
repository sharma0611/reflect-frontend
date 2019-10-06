// @flow
import React from 'react'
import { TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { Colors, Metrics, AppStyles } from 'Themes'
import V from 'Components/V'
import { withNavigation } from 'react-navigation'

type Props = {
    navigate: any
}

const AsModal = (WrappedComponent, modalStyle, roundedTop = false) => {
    class ModalWrapper extends React.Component<Props, *> {
        render() {
            const backgroundStyle = StyleSheet.flatten([
                styles.defaultModal,
                modalStyle && modalStyle,
                roundedTop && styles.roundedTop
            ])
            const { navigation, ...rest } = this.props
            return (
                <V style={styles.screen}>
                    <TouchableWithoutFeedback onPress={navigation.navigate.goBack}>
                        <V flex={1} />
                    </TouchableWithoutFeedback>
                    <V style={backgroundStyle}>
                        <WrappedComponent {...this.props} />
                    </V>
                </V>
            )
        }
    }
    return withNavigation(ModalWrapper)
}

export const MODAL_HEIGHT = Metrics.screenHeight * 0.95

const styles = StyleSheet.create({
    defaultModal: {
        height: MODAL_HEIGHT,
        width: '100%',
        backgroundColor: Colors.WhiteM,
        overflow: 'hidden',
        ...AppStyles.dropShadow.large
    },
    roundedTop: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    screen: {
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    }
})

export default AsModal
