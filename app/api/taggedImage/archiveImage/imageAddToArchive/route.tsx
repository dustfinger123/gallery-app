import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/mongodb";
import { imageAlbum, imageArchive, imageGeneral } from "@/lib/models/ImageData";

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

            await mongoose.connect(connectionStr)
            const data1 = await imageAlbum.findOneAndDelete({ user_email: email, secure_url: reqData });
            const data2 = await imageGeneral.findOneAndDelete({ user_email: email, secure_url: reqData });

            const createArchivedData = async (data: { toObject: () => any; }, collectionName: string) => {
                if (data) {
                    const archivedData = {
                        ...data.toObject(),  // Use toObject() to get a plain JavaScript object
                        collectionName,
                    };
                    await imageArchive.create(archivedData);
                    // console.log(`Image Archived from ${collectionName}:`, archivedData);
                }
            };

            await Promise.all([
                createArchivedData(data1, 'imageAlbum'),
                createArchivedData(data2, 'imageGeneral'),
            ]);

            return NextResponse.json({
                status: 200,
                message: "Images Archived Successfully",
            });

        }
        catch (error) {
            console.error('Error handling data:', error);
            return NextResponse.json({
                message: 'Error Archiving Image', status: 500
            });
        }
    }

    // If the method is not POST, return a method not allowed response
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}