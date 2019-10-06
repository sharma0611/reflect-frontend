import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'
import { lineHeight } from './Utils/normalizeText'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.WhiteM,
        paddingBottom: Metrics.padding.large
    },
    fullScreenContainer: {
        flex: 1,
        backgroundColor: Colors.fmzWhite,
        paddingTop: Metrics.statusBarHeight
    },
    bringToFront: {
        elevation: 10
    },
    dropShadow: {
        normal: {
            shadowColor: Colors.BlackM,
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.22,
            elevation: 4
        },
        hard: {
            shadowColor: Colors.BlackM,
            shadowOffset: {
                width: 1,
                height: 2
            },
            shadowOpacity: 0.3,
            shadowRadius: 2
        },
        small: {
            shadowColor: Colors.BlackM,
            shadowOffset: {
                width: 0,
                height: 1
            },
            shadowOpacity: 0.3,
            shadowRadius: 1.8,
            elevation: 2
        },
        smallReverse: {
            shadowColor: Colors.BlackM,
            shadowOffset: {
                width: 0,
                height: -3.5
            },
            shadowOpacity: 0.1
        },
        reverse: {
            shadowColor: Colors.BlackM,
            shadowOffset: {
                width: 0,
                height: -3.5
            },
            shadowOpacity: 0.2
        },
        large: {
            shadowColor: Colors.BlackM,
            shadowOffset: {
                width: 0,
                height: 1
            },
            shadowRadius: 1,
            shadowOpacity: 0.1
        }
    }
}

export default ApplicationStyles
