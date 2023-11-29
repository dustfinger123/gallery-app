import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import User from "@/lib/models/User";
import { connectionStr } from "@/lib/mongodb";
import mongoose from "mongoose";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    if (req.method === 'POST') {
        try {
            const data = await req.json();
            // Securely handle sensitive information such as passwords
            const token = cookies().get('token')?.value;

            if (!token) {
                return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
            }

            const key = process.env.NEXT_PUBLIC_JWT_API_KEY as string;
            const decodedToken = Jwt.verify(token, key) as { email: string };
            const email = decodedToken.email;

            await mongoose.connect(connectionStr);
            const user = await User.findOne({ email: email });

            if (!user) {
                return NextResponse.json({ status: 401, message: 'User not found' });
            }

            const passwordMatch = await bcrypt.compare(data.password, user.folderPassword);

            if (!passwordMatch) {
                return NextResponse.json({ status: 401, message: 'Invalid password' });
            }

            return NextResponse.json({ status: 200, message: 'Access Granted!!' });

        } catch (error) {
            console.error('Error processing POST request:', error);
            return NextResponse.error();
        }
    }
}
