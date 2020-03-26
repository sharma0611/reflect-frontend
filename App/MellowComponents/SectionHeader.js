import React from 'react'
import V from 'Components/V'
import T from 'Components/T'

const SectionHeader = ({ header, subtitle, RightComponent, ...rest }) => {
    return (
        <V pt={3} {...rest}>
            <V row jc="space-between">
                <T heading4 color="Gray2">
                    {header}
                </T>
                {!!RightComponent && <RightComponent />}
            </V>
            {!!subtitle && (
                <V pt={2}>
                    <T subtitle2 color="Gray2">
                        {subtitle}
                    </T>
                </V>
            )}
        </V>
    )
}

export default SectionHeader
