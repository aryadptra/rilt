import { Link, usePage } from '@inertiajs/react'
import React from 'react'
import NavigationLink from './NavigationLink'
import NavigationDropdownMenu from './NavigationDropdownMenu'
import NavigationMobile from './NavigationMobile'

export default function Navigation() {
    const { auth } = usePage().props
    return (
        <>
            <NavigationMobile />
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
                                <NavigationLink href={'/'}>Beranda</NavigationLink>
                                <NavigationLink>
                                    <NavigationDropdownMenu label={'Artikel'}>
                                        <NavigationDropdownMenu.Link href={route('articles.table')}>Semua Artikel</NavigationDropdownMenu.Link>
                                        <NavigationDropdownMenu.Link href={route('articles.create')}>Buat Artikel</NavigationDropdownMenu.Link>
                                        <NavigationDropdownMenu.Link href={route('articles.table', { status: 'Published' })}>Publikasi</NavigationDropdownMenu.Link>
                                    </NavigationDropdownMenu>
                                </NavigationLink>
                            </div>
                            <div className="flex items-center">
                                {auth.user ? (
                                    <NavigationDropdownMenu label={auth.user.name}>
                                        <NavigationDropdownMenu.Link href={route('articles.table')}>
                                            Artikel
                                        </NavigationDropdownMenu.Link>
                                        <NavigationDropdownMenu.Link
                                            href={route('logout')}
                                            method="POST"
                                            as="button"
                                        >
                                            Logout
                                        </NavigationDropdownMenu.Link>
                                    </NavigationDropdownMenu>
                                ) : (
                                    null
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
