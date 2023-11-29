import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/mongodb";
import { imageGeneral } from "@/lib/models/ImageData";

export async function POST(req: NextRequest) {
    if (req.method === 'POST') {
        try {
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
            const reqData = await req.json()
            const cloudinaryDate = new Date(reqData.data.created_at)
            // Get the user's browser timezone
            const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            // Convert to the user's local timezone
            const localDate = cloudinaryDate.toLocaleString(undefined, { timeZone: userTimezone });

            const data = {
                public_id: reqData.data.public_id,
                imageTitle: reqData.data.tags[0].toString(),
                secure_url: reqData.data.secure_url,
                date_string: localDate,
                user_email: email,
                favourite: reqData.data.favourite
            }
            await mongoose.connect(connectionStr)
            await imageGeneral.create(data)

            return NextResponse.json({
                status: 200, message: "Image Uploaded Successfully"
            })
        }
        catch (error) {
            console.error('Error handling data:', error);
            return NextResponse.json({
                message: 'Error uploading Image', status: 500
            });
        }
    }

    // If the method is not POST, return a method not allowed response
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}