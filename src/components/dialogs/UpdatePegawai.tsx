'use client'

import { Edit3Icon, Trash2Icon } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import PegawaiUpdateForm from "../form/PegawaiUpdateForm"

const UpdatePegawai = (idPeg: any) => {
    const [open, setOpen] = useState(false)

    const pegID = idPeg.idPeg

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="p-2 bg-yellow-200 rounded-md hover:bg-yellow-400">
                    <Edit3Icon color="black" />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit data pegawai</DialogTitle>
                        <DialogDescription>
                            Berikut isian untuk merubah data pegawai.
                        </DialogDescription>
                    </DialogHeader>
                    <PegawaiUpdateForm setOpen={setOpen} idPeg={pegID} />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default UpdatePegawai