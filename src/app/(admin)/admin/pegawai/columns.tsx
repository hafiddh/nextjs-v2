"use client"

import DeletePegawai from "@/components/dialogs/DeletePegawai"
import UpdatePegawai from "@/components/dialogs/UpdatePegawai"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, DeleteIcon, Edit, MoreVertical, TrashIcon } from "lucide-react"

export type Pegawai = {
    id: string
    nip: number
    nama: string
    golongan: string
    tgl_lahir: string
}

export const columns: ColumnDef<Pegawai>[] = [
    {
        accessorKey: "id",
        header: "No",
        cell: ({ row }) => {
            return <div>{row.index + 1}</div>
        }
    },
    {
        accessorKey: "nip",
        header: ({ column }) => {
            return (
                <div className="">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        NIP
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
    },
    {
        accessorKey: "nama",
        header: "Nama",
    },
    {
        accessorKey: "golongan",
        header: () => <div className="text-center">Golongan</div>,
        cell: ({ row }) => {
            return <div className="text-center">{row.getValue("golongan")}</div>
        }
    },
    {
        accessorKey: "tgl_lahir",
        header: ({ column }) => {
            return (
                <div className="text-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Tanggal Lahir
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            const tanggal = new Date(row.getValue("tgl_lahir"));
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            const tanggal_terformat = tanggal.toLocaleDateString('id-ID', options);


            return <div className="text-center">{tanggal_terformat}</div>
        },
    },
    {
        accessorKey: '#',
        header: () => <div className="text-center">#</div>,
        cell: ({ row }) => {
            return <div className="text-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size='icon'><MoreVertical /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-0 flex flex-col space-y-1 p-2">
                        <UpdatePegawai idPeg={row.getValue("id")} />
                        <DeletePegawai idPeg={row.getValue("id")} />
                        {/* <Button size='icon' variant='destructive' onClick={() => deletePegawaiHandle(row.getValue("id"))}> <TrashIcon /></Button> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        },
    },
]