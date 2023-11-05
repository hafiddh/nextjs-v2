'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Check, Trash2Icon, X } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

const DeletePegawai = (idPeg: any) => {
    const { toast } = useToast()
    const router = useRouter()

    const [open, setOpen] = useState(false)

    const pegID = idPeg.idPeg

    const deleteHandler = async (id: String) => {

        const response = await fetch(`/api/pegawai/${id}`, {
            method: 'DELETE',
        }).then(res => {
            if (res.ok) {
                toast({
                    title: "Sukses!",
                    description: "Data dihapus!.",
                    variant: 'default',
                })
 
                router.refresh()

                setOpen(false)
            } else {
                return res.text().then(text => { throw new Error(text) })
            }
        }).catch(err => {
            toast({
                title: "Error!",
                description: "" + err,
                variant: 'destructive',
            })
        });
    }

    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger className="p-2 bg-red-600 rounded-md hover:bg-red-800">
                    <Trash2Icon color="white" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Data dihapus tidak dapat dikembalikan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel><X /></AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteHandler(pegID)}><Check /></AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default DeletePegawai