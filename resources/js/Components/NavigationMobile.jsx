import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import NavigationDropdownMenu from './NavigationDropdownMenu';

export default function NavigationMobile() {
    const { auth } = usePage().props;
    return (
        <nav className="border-b border-gray-800 bg-gray-900 px-4 py-4 lg:hidden">
            <div className="flex items-center justify-between">
                <Link className="text-xl font-semibold text-white" href="/">
                    {import.meta.env.VITE_APP_NAME}
                </Link>
                <NavigationDropdownMenu
                    toggleAnimate={false}
                    label={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    }
                >
                    <NavigationDropdownMenu.Link href={'/'}>Home</NavigationDropdownMenu.Link>
                    <NavigationDropdownMenu.Link href={'/articles'}>
                        Articles
                    </NavigationDropdownMenu.Link>
                    {auth.user ? (
                        <>
                            <NavigationDropdownMenu.Link href={route('dashboard')}>
                                Dashboard
                            </NavigationDropdownMenu.Link>
                            <NavigationDropdownMenu.Link href={'#'}>
                                My profile
                            </NavigationDropdownMenu.Link>
                            <NavigationDropdownMenu.Link href={'#'}>
                                Settings
                            </NavigationDropdownMenu.Link>
                            <NavigationDropdownMenu.Divider />
                            <NavigationDropdownMenu.Link href={'#'}>
                                My articles
                            </NavigationDropdownMenu.Link>
                            <NavigationDropdownMenu.Link href={'#'}>
                                New article
                            </NavigationDropdownMenu.Link>
                            <NavigationDropdownMenu.Divider />
                            <NavigationDropdownMenu.Link
                                href={route('logout')}
                                method="POST"
                                as="button"
                            >
                                Logout
                            </NavigationDropdownMenu.Link>
                        </>
                    ) : (
                        <>
                            <NavigationDropdownMenu.Divider />
                            <NavigationDropdownMenu.Link href={route('login')}>
                                Login
                            </NavigationDropdownMenu.Link>
                            <NavigationDropdownMenu.Link href={route('register')}>
                                Register
                            </NavigationDropdownMenu.Link>
                        </>
                    )}
                </NavigationDropdownMenu>
            </div>
        </nav>
    );
}
