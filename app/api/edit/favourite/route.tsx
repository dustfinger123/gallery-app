import { imageAlbum, imageArchive, imageGeneral, imageLocked } from "@/lib/models/ImageData";
import { connectionStr } from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await mongoose.connect(connectionStr);

        const data = await req.json();

        await imageGeneral.updateOne(
            { secure_url: data.secure_url },
            { $set: { favourite: data.favourite } }
        );
        await imageAlbum.updateOne(
            { secure_url: data.secure_url },
            { $set: { favourite: data.favourite } }
        );
        await imageArchive.updateOne(
            { secure_url: data.secure_url },
            { $set: { favourite: data.favourite } }
        );
        await imageLocked.updateOne(
            { secure_url: data.secure_url },
            { $set: { favourite: data.favourite } }
        );

        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.error("Error updating image:", error);
        return NextResponse.json({ status: 500, error: "Internal Server Error" });
    }
}
