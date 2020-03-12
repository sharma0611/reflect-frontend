import React from 'react'
import LoadingSpinner from '../Components/LoadingSpinner'
import FixedWaveBackground from 'MellowComponents/FixedWaveBackground'

export default function Loading() {
    return (
        <FixedWaveBackground>
            <LoadingSpinner />
        </FixedWaveBackground>
    )
}
