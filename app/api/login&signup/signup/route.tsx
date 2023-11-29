import User from "@/lib/models/User";
import { connectionStr } from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function POST(req: any) {
    if (req.method === 'POST') {
        const data = await req.json();
        const { email, password, nickname, phone, gender, prefix } = data;
        let folderPassword = ''
        try {
            mongoose.connect(connectionStr);

            const existingUser = await User.findOne({ email })
            if (existingUser) {
                return NextResponse.json({ status: 400, message: 'User already exists' });
            }

            const newUser = new User({ email, password, nickname, phone, gender, prefix, folderPassword })
            await newUser.save()

            return NextResponse.json({ status: 201, message: 'User registered successfully' });

        } catch (error) {
            console.log('Error registering user:', error);
            return NextResponse.json({ status: 500, message: 'Error registering user' });
        }
    }
    return NextResponse.json({ status: 405, message: 'Method Not Allowed' });
}

