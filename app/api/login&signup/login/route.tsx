import User from "@/lib/models/User";
import { connectionStr } from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { setCookie } from "cookies-next";


import { cookies } from 'next/headers'

export async function POST(req: any, res: NextResponse) {
    if (req.method === 'POST') {
        const data = await req.json()
        const { email, password } = data
        const secretKey: string = process.env.NEXT_PUBLIC_JWT_API_KEY as string
        // console.log(secretKey)

        try {
            mongoose.connect(connectionStr)

            const user = await User.findOne({ email })
            if (!user) {
                return NextResponse.json({ status: 404, message: 'User not found' })
            }

            const passwordMatch = await bcrypt.compare(password, user.password)
            if (!passwordMatch) {
                return NextResponse.json({ status: 401, message: 'Invalid password' })
            }
            const userData = {
                email: user.email,
                name: user.nickname,
                gender: user.gender,
                phone: user.phone,
                prefix: user.prefix,
                folderPassword: user.folderPassword
            }
            // console.log(userData)

            const token = jwt.sign(userData, secretKey);

            cookies().set('token', token, { httpOnly: true, secure: true })

            return NextResponse.json({ status: 200, message: 'Login Successfull !!', userData })

        }
        catch (error) {
            console.error('Error logging in:', error)
            return NextResponse.json({ status: 500, message: 'Internal Server Error' })
        }
    }
    return NextResponse.json({ status: 405, message: 'Method Not Allowed' })
}


