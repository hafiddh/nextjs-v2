'use client'

import * as z from "zod"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../ui/form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { SaveIcon } from "lucide-react"

const FormSchema = z.object({
    nip: z
        .string()
        .min(18, 'NIP berisi minimal 18 karakter')
        .max(18, 'NIP berisi maksimal 18 karakter'),
    nama: z
        .string()
        .min(3, 'Nama berisi minimal 3 karakter')
        .max(50, 'Nama berisi maksimal 50 karakter'),
    golongan: z
        .string()
        .min(1, 'Golongan dibutuhkan'),
    tgl_lahir: z
        .z.string().transform((str) => new Date(str)),
})

const PegawaiCreateForm = ({ setOpen }: any) => {
    const { toast } = useToast()
    const router = useRouter()

    const golongan_data = [
        { value: 'IV/e', text: 'IV/e' },
        { value: 'IV/d', text: 'IV/d' },
        { value: 'IV/c', text: 'IV/c' },
        { value: 'IV/b', text: 'IV/b' },
        { value: 'IV/a', text: 'IV/a' },
        { value: 'III/d', text: 'III/d' },
        { value: 'III/c', text: 'III/c' },
        { value: 'III/b', text: 'III/b' },
        { value: 'III/a', text: 'III/a' },
        { value: 'II/d', text: 'II/d' },
        { value: 'II/c', text: 'II/c' },
        { value: 'II/b', text: 'II/b' },
        { value: 'II/a', text: 'II/a' },
        { value: 'I/d', text: 'I/d' },
        { value: 'I/c', text: 'I/c' },
        { value: 'I/b', text: 'I/b' },
        { value: 'I/a', text: 'I/a' },
    ];

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        // console.log(values)
        const response = await fetch('/api/pegawai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nip: values.nip,
                nama: values.nama,
                golongan: values.golongan,
                tgl_lahir: values.tgl_lahir,
            })
        }).then(res => {
            if (res.ok) { 

                toast({
                    title: "Sukses!",
                    description: "Data berhasil ditambahkan!.",
                    variant: 'default',
                })

                router.replace('/admin/pegawai')
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
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                    <div className="space-y-3">
                        <FormField
                            control={form.control}
                            name="nip"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>NIP</FormLabel>
                                    <FormControl>
                                        <Input placeholder="NIP" {...field} type="number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="nama"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nama" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="golongan"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Golongan</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="- Pilih Golongan -" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="overflow-y-auto max-h-[10rem]">
                                            {golongan_data.map((item, index) => {
                                                return (
                                                    <SelectItem key={index} value={item.value}>{item.text}</SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tgl_lahir"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Tanggal Lahir</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nama" type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button className="mt-5 w-full" type="submit">
                        <SaveIcon className="mr-2 h-4 w-4" size={18} /> Simpan
                    </Button>
                </form>
            </Form>
        </>
    )
}

export default PegawaiCreateForm