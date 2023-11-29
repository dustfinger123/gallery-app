import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import { album } from "@/lib/models/ImageData";
import { connectionStr } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
    if (req.method === 'POST') {
        try {
            const albumName = await req.json()

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

            const data = {
                albumTitle: albumName.trim().toLowerCase(),
                user_email: email,
            }
            await mongoose.connect(connectionStr)
            const checkName = await album.findOne({ albumTitle: albumName })

            if (!checkName) {
                await album.create(data)
                return NextResponse.json({ status: 200, message: "Album created successfully" })
            } else {
                return NextResponse.json({
                    status: 409,
                    message: "Album name already exists, Try different name",
                })
            }
        }
        catch (error) {
            console.error('Error handling data:', error);
            return NextResponse.json({
                message: 'Error creating album', status: 500
            });
        }
    }
}