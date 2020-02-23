import React from 'react'
import V from 'Components/V'

const Section = ({ children, ...rest }) => (
    <V pl={4} pr={4} pt={3} {...rest}>
        {children}
    </V>
)

export default Section
