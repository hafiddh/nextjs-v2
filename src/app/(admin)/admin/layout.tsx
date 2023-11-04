
import React, { FC, ReactNode } from 'react'
import AdminComp from '@/components/AdminComp'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = async ({ children }) => {

    const session = await getServerSession(authOptions)
    if (session?.user) {
        return (
            <>
                <div className='mr-auto mb-auto container' style={{ marginTop: '10vh' }}>
                    <AdminComp />
                    <hr className='mt-3 mb-3' />
                    {children}
                </div>
            </>
        )
    }

    return (
        <div>Silakan login untuk melihat data</div>
    )
}

export default AuthLayout