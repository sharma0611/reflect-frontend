// @flow
import { TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'

const Touchable = Platform.select({
    ios: TouchableOpacity,
    android: TouchableNativeFeedback
})

export default Touchable
