import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {

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
            message: "Server error."
        }, {
            status: 500
        })
    }
}
