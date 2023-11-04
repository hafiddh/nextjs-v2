'use client'

import { signOut } from "next-auth/react"
import { Button } from "./ui/button"
import { LogOut } from "lucide-react"

const LogoutButton = () => {
    return (
        <Button onClick={() => signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/sign-in`
        })} variant='destructive'>
            <LogOut className="mr-2 h-4 w-4" size={18} />Logout
        </Button>
    )
}

export default LogoutButton