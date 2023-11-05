import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { verifyJwt } from "@/lib/jwt";

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