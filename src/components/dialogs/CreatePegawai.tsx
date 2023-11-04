'use client'

import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import PegawaiCreateForm from "../form/PegawaiCreateForm"
import { useState } from "react"

const CreatePegawai = () => {
    const [open, setOpen] = useState(false) 

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="p-2 bg-slate-700 rounded-md hover:bg-slate-500">
                    <PlusIcon color="#ffffff" />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tambah data pegawai</DialogTitle>
                        <DialogDescription>
                            Berikut isian untuk menambah data pegawai baru.
                        </DialogDescription>
                    </DialogHeader>
                    <PegawaiCreateForm setOpen={setOpen} />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CreatePegawai