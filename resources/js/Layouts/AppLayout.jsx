import Footer from '@/Components/Footer'
import Navigation from '@/Components/Navigation'
import React, { Children } from 'react'

export default function AppLayout({ children }) {
    return (
        <>
            <Navigation />
            {children}
            <Footer />
        </>
    )
}
