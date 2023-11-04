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
import { LogIn } from "lucide-react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

const FormSchema = z.object({
    email: z
        .string()
        .min(1, 'Email dibutuhkan')
        .email('Email tidak sesuai'),
    password: z
        .string()
        .min(1, 'Password dibutuhkan')
        .min(8, 'Password berisi minimal 8 karakter')
})

const SignInForm = () => {
    const { toast } = useToast()
    const router = useRouter()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const signInData = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false
        })
        if (signInData?.error) {
            toast({
                title: "Error!",
                description: "Opps!, Something went wrong.",
                variant: 'destructive',
            })
            console.log(signInData.error);
        } else {
            router.refresh()
            router.push('/admin')
        }

    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                    <div className="space-y-2">
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
                    </div>
                    <Button className="mt-5 w-full" type="submit">
                        <LogIn className="mr-2 h-4 w-4" size={18} /> Login
                    </Button>
                </form>
                <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
                    or
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                    Jika belum memiliki akun, silakan&nbsp;
                    <Link href='/sign-up' className="text-blue-500">Daftar</Link>
                </p>
            </Form>
        </>
    )
}

export default SignInForm