import { album } from "@/lib/models/ImageData";
import { connectionStr } from "@/lib/mongodb";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import Jwt from "jsonwebtoken";

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

        // Fetch data from MongoDB based on the user's email
        const res = await album.find({ user_email: email });

        const albumList: any = res.map(item => item.albumTitle)

        if (res) {
            // If data is found, return it in the response
            return NextResponse.json({ status: 200, albumList });
        } else {
            // If no data is found, return a not found response
            return NextResponse.json({ status: 404, message: 'Data not found' });
        }
    } catch (error) {
        // Handle errors and return an error response
        console.error('Error handling data:', error);
        return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
    }
}    
