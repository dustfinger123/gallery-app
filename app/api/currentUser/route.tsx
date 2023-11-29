import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
    const secretKey: string = process.env.NEXT_PUBLIC_JWT_API_KEY as string
    const token = req.cookies.get('token')?.value

    let data
    if (token) {
        const decode = Jwt.verify(token, secretKey)
        data = decode
    }

    return NextResponse.json({ status: 200, data })
}