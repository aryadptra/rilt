import React from 'react'

export default function Container({ children }) {
    return (
        <div className="mx-auto max-w-screen-2xl md:px-0">
            {children}
        </div>
    )
}
