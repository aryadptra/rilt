import { Link } from '@inertiajs/react'
import React from 'react'
import NavigationLink from './NavigationLink'
import NavigationDropdownMenu from './NavigationDropdownMenu'

export default function Navigation() {
    return (
        <>
            <nav className="hidden border-b border-dashed border-gray-800 bg-gray-900 py-4 shadow lg:block">
                <div className="mx-auto max-w-screen-2xl">
                    <div className="flex items-center justify-between">
                        <Link href='/'
                            className="mr-3 text-lg font-semibold capitalize text-white"
                        >
                            {import.meta.env.VITE_APP_NAME}
                        </Link>
                        <div className="flex flex-1 items-center justify-between">
                            <div>
                                <NavigationLink href={'/'}>Home</NavigationLink>
                            </div>
                            <div className="flex items-center">
                                <NavigationDropdownMenu label="Arya">
                                    <NavigationDropdownMenu.Link>
                                        Dashboard
                                    </NavigationDropdownMenu.Link>
                                </NavigationDropdownMenu>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
