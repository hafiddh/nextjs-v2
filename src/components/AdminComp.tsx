'use client'

import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

const AdminComp = () => {

    const router = useRouter()

    const userPage = () => {
        router.refresh()
        router.push('/admin/user')
    }
    const pegawaiPage = () => {
        router.refresh()
        router.push('/admin/pegawai')
    }


    return (
        <>
            <div>
                <Button variant='outline' className='mr-2' onClick={() => userPage()}>User</Button>
                <Button variant='outline' onClick={() => pegawaiPage()}>Pegawai</Button>
            </div>
        </>
    )
}

export default AdminComp