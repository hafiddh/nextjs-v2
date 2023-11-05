// import { signJwtAccessToken } from "@/lib/jwt";
import { db } from "@/lib/db";
import { signJwtAccessToken } from "@/lib/jwt";
import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";

interface RequestBody {
    email: string;
    password: string;
}
export async function POST(request: Request) {
    const body: RequestBody = await request.json();

    const user = await db.user.findUnique({
        where: {
            email: body?.email
        }
    })


    if (user && (await bcrypt.compare(body.password, user.password))) {
        const { password, ...userWithoutPass } = user;
        const accessToken = signJwtAccessToken(userWithoutPass);

        return NextResponse.json({
            ...userWithoutPass,
            accessToken
        }, {
            status: 201
        })
    } else {
        return new Response(
            JSON.stringify({
                message: "Unathenticated",
            }),
            {
                status: 401,
            }
        );
    }
}