// pages/api/cloudinary.js

import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
    try {
        const publicId = await req.json()

        const apiUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_cloud_name}/resources/image/upload?public_ids=${publicId}&invalidate=true`;

        const response = await axios.delete(apiUrl, {
            auth: {
                username: process.env.NEXT_PUBLIC_api_key as string,
                password: process.env.NEXT_PUBLIC_api_secret as string,
            },
        });

        const public_Id = Object.keys(response.data.deleted)[0]
      
        return NextResponse.json(public_Id)
    }
    catch (error) {
        console.error("Error deleting image:", error);
        return NextResponse.error();
    }
};
