import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import CreatePegawai from "@/components/dialogs/CreatePegawai"
import { Pegawai, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Pegawai[]> {
    const response = await fetch(`${process.env.NEXT_URL}/api/pegawai`, {
        method: 'GET',
    }).then(res => {
        if (res.ok) {
            const data = res.json()
            return data
        } else {
            return res.text().then(text => { throw new Error(text) })
        }
    }).catch(err => {
        console.log(err);
    });

    return response
}
const PegawaiPage = async () => {
    const data = await getData() 

    return (
        <>
            <h1 style={{ fontSize: 22, fontWeight: 700 }}>Data Pegawai</h1>
            <div className="flex flex-row-reverse">
                <CreatePegawai />
            </div>
            <div className="mt-3 p-2 bg-slate-50 w-full" >
                <DataTable columns={columns} data={data} />
            </div>
        </>
    )
}

export default PegawaiPage