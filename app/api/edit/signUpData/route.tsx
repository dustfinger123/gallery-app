import { connectionStr } from "@/lib/mongodb";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import User from "@/lib/models/User";
import bcrypt from 'bcrypt';


export async function POST(req: NextRequest) {
    if (req.method === 'POST') {
        try {
            const data = await req.json()
            const token: string | undefined = cookies().get('token')?.value;

            if (!token) {
                // If token is not present, return an error response
                return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
            }

            // Verify the token using the JWT API key
            const key: string = process.env.NEXT_PUBLIC_JWT_API_KEY as string;
            const decodedToken = Jwt.verify(token, key) as { email: string };

            // Extract the email from the decoded token
            const email: string = decodedToken.email;

            // Connect to MongoDB
            await mongoose.connect(connectionStr);

            const salt = await bcrypt.genSalt(10)
            const hashFolderPassword = await bcrypt.hash(data.password, salt)

            const updatedData = await User.findOneAndUpdate(
                { email: email },
                { $set: { folderPassword: hashFolderPassword } },
                { returnDocument: 'after' }
            )
            return NextResponse.json({ status: 200, updatedData })
        } catch (error) {
            console.error("Error updating password:", error);
            return NextResponse.json({ status: 500, error: "Internal Server Error" });
        }

    }
}