import clsx from 'clsx'
import React from 'react'

export default function Container({ className = '', children }) {
    return (
        <div className={clsx(className, "mx-auto max-w-screen-2xl px-5 md:px-0")}>
            {children}
        </div>
    )
}
