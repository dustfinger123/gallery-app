import { imageLocked, imageArchive, imageAlbum, imageGeneral, imageTrash } from "@/lib/models/ImageData";
import { connectionStr } from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// Establish the database connection outside the route handler
mongoose.connect(connectionStr);

export async function POST(req: NextRequest) {
    try {
        const public_id = await req.json();

        const imageModels = [imageLocked, imageArchive, imageAlbum, imageGeneral];

        const deletePromises = imageModels.map(async (model) => {
            return model.findOneAndDelete({ public_id });
        });

        const [lockedImage, archiveImage, albumImage, generalImage] = await Promise.all(deletePromises);

        const createTrashData = async (data: { toObject: () => any; }, deleteFrom: string) => {
            if (data) {
                await imageTrash.create({
                    ...data.toObject(),
                    deleteFrom,
                });
            }
        };

        await Promise.all([
            createTrashData(lockedImage, 'imageLocked'),
            createTrashData(archiveImage, 'imageArchive'),
            createTrashData(albumImage, 'imageAlbum'),
            createTrashData(generalImage, 'imageGeneral'),
        ]);

        // Handle case when no image is found for deletion
        if (!lockedImage && !archiveImage && !albumImage && !generalImage) {
            return NextResponse.json({
                status: 404,
                message: 'Image not found for deletion'
            });
        }

        return NextResponse.json({
            status: 200,
            message: 'Image added to trash'
        });
    } catch (error) {
        console.error('Error during image deletion:', error);
        return NextResponse.json({
            status: 500,
            message: 'Internal server error'
        });
    }
}
