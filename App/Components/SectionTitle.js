import React from 'react'
import T from 'Components/T'
import V from 'Components/V'

const SectionTitle = ({ subTitle, children }) => (
    <V px={2}>
        <T titleS color="GreyL">
            {children}
        </T>
        {subTitle && (
            <T subHeading color="GreyL" py={1}>
                {subTitle}
            </T>
        )}
    </V>
)

export default SectionTitle
