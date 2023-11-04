import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as z from "zod"

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

export async function GET() {
    try {
        const Pegawai = await db.pegawai.findMany()

        return NextResponse.json(Pegawai, {
            status: 201
        })

    } catch (error) {
        return NextResponse.json({
            message: "Server error."
        }, {
            status: 500
        })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { nip, nama, golongan, tgl_lahir } = FormSchema.parse(body)

        const existingUserByNip = await db.pegawai.findUnique({
            where: {
                nip: nip
            }
        })

        if (existingUserByNip) {
            return NextResponse.json("NIP sudah ada", {
                status: 409
            })
        }

        const pegawaiBaru = await db.pegawai.create({
            data: {
                nip,
                nama,
                golongan,
                tgl_lahir
            }
        })


        return NextResponse.json({
            user: pegawaiBaru,
            message: "Pegawai berhasil ditambahkan."
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