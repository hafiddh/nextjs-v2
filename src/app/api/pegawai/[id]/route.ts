import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { verifyJwt } from "@/lib/jwt";
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

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {

    const session = await getServerSession(authOptions)
    const token = req.headers.get('token')

    if (!token && !session) {
        return NextResponse.json({
            status: "Unauthorized"
        }, {
            status: 401
        })
    }

    if (token) {
        if (verifyJwt(token)) {
        } else {
            return NextResponse.json({
                status: "Invalid Token"
            }, {
                status: 401
            })
        }
    }

    const idPeg = params.id

    try {
        const Pegawai = await db.pegawai.findUnique({
            where: {
                id: idPeg
            }
        })

        return NextResponse.json(Pegawai, {
            status: 201
        })

    } catch (error) {
        return NextResponse.json({
            message: "Server error.",
            error
        }, {
            status: 500
        })
    }
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {

    const session = await getServerSession(authOptions)
    const token = req.headers.get('token')

    if (!token && !session) {
        return NextResponse.json({
            status: "Unauthorized"
        }, {
            status: 401
        })
    }

    if (token) {
        if (verifyJwt(token)) {
        } else {
            return NextResponse.json({
                status: "Invalid Token"
            }, {
                status: 401
            })
        }
    }

    const idPeg = params.id

    try {
        const Pegawai = await db.pegawai.delete({
            where: {
                id: idPeg
            }
        })

        return NextResponse.json(Pegawai, {
            status: 201
        })

    } catch (error) {
        return NextResponse.json({
            message: "Server error.",
            error
        }, {
            status: 500
        })
    }
}


export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {

    const session = await getServerSession(authOptions)
    const token = req.headers.get('token')

    if (!token && !session) {
        return NextResponse.json({
            status: "Unauthorized"
        }, {
            status: 401
        })
    }

    if (token) {
        if (verifyJwt(token)) {
        } else {
            return NextResponse.json({
                status: "Invalid Token"
            }, {
                status: 401
            })
        }
    }

    const idPeg = params.id

    try {
        const body = await req.json()
        const { nip, nama, golongan, tgl_lahir } = FormSchema.parse(body)

        const pegawaiBaru = await db.pegawai.update({
            where: {
                id: idPeg
            },
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
        return NextResponse.json({
            message: "Server error.",
            error
        }, {
            status: 500
        })
    }
}