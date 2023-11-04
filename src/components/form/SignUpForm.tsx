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
import { Contact2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

const FormSchema = z.object({
    name: z
        .string()
        .min(3, 'Nama berisi minimal 3 karakter')
        .max(50, 'Nama berisi maksimal 50 karakter'),
    username: z
        .string()
        .min(3, 'Username berisi minimal 3 karakter')
        .max(15, 'Username berisi maksimal 15 karakter'),
    email: z
        .string()
        .min(1, 'Email dibutuhkan')
        .email('Email tidak sesuai'),
    password: z
        .string()
        .min(1, 'Password dibutuhkan')
        .min(8, 'Password berisi minimal 8 karakter'),
    confirmPassword: z
        .string()
        .min(1, 'Password dibutuhkan')
        .min(8, 'Password berisi minimal 8 karakter')
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password tidak sesuai.'
})

const SignUpForm = () => {
    const { toast } = useToast()
    const router = useRouter()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        // console.log(values)
        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: values.name,
                username: values.username,
                email: values.email,
                password: values.password,
            })
        })

        if (response.ok) {
            router.push('/sign-in')
        }else{
            console.error('Register gagal.'); 
            toast({
                title: "Error!",
                description: "Opps!, Something went wrong.",
                variant: 'destructive',
            })
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="name"
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
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Password" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Masukkan ulang password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Masukkan ulang password" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button className="mt-5 w-full" type="submit">
                        <Contact2 className="mr-2 h-4 w-4" size={18} />Daftar
                    </Button>
                </form>
                <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
                    or
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                    Jika sudah memiliki akun, silakan&nbsp;
                    <Link href='/sign-in' className="text-blue-500">Login</Link>
                </p>
            </Form>
        </>
    )
}

export default SignUpForm