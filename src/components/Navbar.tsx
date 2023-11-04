import Link from 'next/link'
import React from 'react'
import { Button, buttonVariants } from './ui/button'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import LogoutButton from './LogoutButton'
import { LogIn } from 'lucide-react'
import Image from 'next/legacy/image'

const Navbar = async () => {
    const session = await getServerSession(authOptions)

    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                <Link href='/' className='flex items-center'>
                    <Image
                        alt='Logo'
                        src="/favicon.ico"
                        width='35'
                        height='35'
                    />
                </Link>
                <div className="flex md:order-2">
                    {session?.user ? (
                        <>
                            <h1 className="block py-2 pl-3 pr-4">
                                {session?.user.name}
                            </h1>
                            <LogoutButton />
                        </>
                    ) : (
                        <Link className={buttonVariants()} href='/sign-in'>
                            <LogIn className="mr-2 h-4 w-4" size={18} />
                            Sign in</Link>
                    )}
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 mr-auto ml-12" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link href="/admin" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Admin</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar