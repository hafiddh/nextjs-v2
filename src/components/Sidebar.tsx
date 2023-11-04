import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"

const Sidebar = () => {
    return (
        <Sheet>
            <SheetTrigger className="mr-auto mb-auto" style={{ paddingTop: '10vh' }}>
                <MenuIcon />
            </SheetTrigger>
            <SheetContent side='left' className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default Sidebar