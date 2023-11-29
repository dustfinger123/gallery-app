import { imageAlbum, imageArchive, imageGeneral, imageLocked } from "@/lib/models/ImageData"
import { connectionStr } from "@/lib/mongodb"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(req: any) {
    if (req.method === 'POST') {
        try {
            const public_id = await req.json()
            // console.log(public_id)

            mongoose.connect(connectionStr);

            await imageLocked.findOneAndRemove({ public_id })
            await imageArchive.findOneAndRemove({ public_id })
            await imageAlbum.findOneAndRemove({ public_id })
            await imageGeneral.findOneAndRemove({ public_id })

            return NextResponse.json({ status: 200, message: 'Deleted Successfuly' })
        }
        catch (error) {
            console.log('Error handling data:', error);
            return NextResponse.json({ status: 500, message: 'Error Deleting data' });
        }
    }
}