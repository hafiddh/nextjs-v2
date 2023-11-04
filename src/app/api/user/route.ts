import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hash } from "bcrypt";
import * as z from "zod"

const FormSchema = z.object({

    name: z
        .string()
        .min(3, 'Nama berisi minimal 3 karakter')
        .max(50, 'Nama berisi maksimal 50 karakter'),
    username: z
        .string()
        .min(3, 'Nama berisi minimal 3 karakter')
        .max(15, 'Nama berisi maksimal 15 karakter'),
    email: z
        .string()
        .min(1, 'Email dibutuhkan')
        .email('Email tidak sesuai'),
    password: z
        .string()
        .min(1, 'Password dibutuhkan')
        .min(8, 'Password berisi minimal 8 karakter'),
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, username, password, name } = FormSchema.parse(body)

        const existingUserByEmail = await db.user.findUnique({
            where: {
                email: email
            }
        })

        if (existingUserByEmail) {
            return NextResponse.json(
                {
                    user: null,
                    message: "Email sudah digunakan."
                }, {
                status: 409
            })
        }

        const existingUserByUsername = await db.user.findUnique({
            where: {
                username: username
            }
        })

        if (existingUserByUsername) {
            return NextResponse.json(
                {
                    user: null,
                    message: "Username sudah digunakan."
                }, {
                status: 409
            })
        }

        const hashPass = await hash(password, 10)
        const newUser = await db.user.create({
            data: {
                username,
                name,
                email,
                password: hashPass
            }
        })

        const { password: newPassword, ...rest } = newUser

        return NextResponse.json({
            user: rest,
            message: "Username berhasil ditambahkan."
        }, {
            status: 201
        })

    } catch (error) {
        // console.log(error)
        return NextResponse.json({
            message: "Server error."
        }, {
            status: 500
        })
    }
}