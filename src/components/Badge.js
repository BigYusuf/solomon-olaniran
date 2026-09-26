import React from 'react'

const Badge = props => {
    return (
        <span className={`px-2 py-3 rounded-2xl ${props.type}`}>
            {props.content}
        </span>
    )
}

export default Badge
