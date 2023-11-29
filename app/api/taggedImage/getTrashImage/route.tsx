import { connectionStr } from "@/lib/mongodb";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import { imageAlbum, imageArchive, imageGeneral, imageLocked, imageTrash } from "@/lib/models/ImageData";

export const revalidate = 2;
export const dynamic = 'force-dynamic';
export async function GET() {
    try {
        // Extract the token value from the 'token' cookie
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

        const data = await imageTrash.find({ user_email: email});


        if (data) {
            // If data is found, return it in the response
            return NextResponse.json({ status: 200, data });
        } else {
            // If no data is found, return a not found response
            return NextResponse.json({ message: 'Data not found', status: 404 });
        }
    }
    catch {
        return NextResponse.json({ status: 500 })
    }
}