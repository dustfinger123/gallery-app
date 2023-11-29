import mongoose from "mongoose";
//General Image Schema
const imageSchemaGeneral = new mongoose.Schema({
    // albumCategory: String,
    public_id: String,
    imageTitle: String,
    secure_url: String,
    date_string: String,
    user_email: String,
    favourite: Number
})

export const imageGeneral = mongoose.models.image_schema_general || mongoose.model('image_schema_general', imageSchemaGeneral)

//Album Image Schema
const imageSchemaAlbum = new mongoose.Schema({
    album_title: String,
    public_id: String,
    imageTitle: String,
    secure_url: String,
    date_string: String,
    user_email: String,
    favourite: Number
})

export const imageAlbum = mongoose.models.image_schema_album || mongoose.model('image_schema_album', imageSchemaAlbum)

//Archive Image
const imageSchemaArchive = new mongoose.Schema({
    album_title: { type: String, required: false },
    public_id: { type: String, required: true },
    imageTitle: { type: String, required: true },
    secure_url: { type: String, required: true },
    date_string: { type: String, required: true },
    user_email: { type: String, required: true },
    favourite: { type: Number, required: false },
    collectionName: { type: String, required: false }
})

export const imageArchive = mongoose.models.image_schema_archive || mongoose.model('image_schema_archive', imageSchemaArchive)

//Album Schema
const albumSchema = new mongoose.Schema({
    albumTitle: String,
    user_email: String,
})

export const album = mongoose.models.album_schema || mongoose.model('album_schema', albumSchema)


//Locked Image
const imageSchemaPrivate = new mongoose.Schema({
    album_title: { type: String, required: false },
    public_id: { type: String, required: true },
    imageTitle: { type: String, required: true },
    secure_url: { type: String, required: true },
    date_string: { type: String, required: true },
    user_email: { type: String, required: true },
    favourite: { type: Number, required: false },
    collectionName: { type: String, required: false },
    isLocked: { type: String, required: true }
})

export const imageLocked = mongoose.models.image_schema_private || mongoose.model('image_schema_private', imageSchemaPrivate)


//Trash Image
const imageSchemaTrash = new mongoose.Schema({
    album_title: { type: String, required: false },
    public_id: { type: String, required: true },
    imageTitle: { type: String, required: true },
    secure_url: { type: String, required: true },
    date_string: { type: String, required: true },
    user_email: { type: String, required: true },
    favourite: { type: Number, required: false },
    collectionName: { type: String, required: false },
    deleteFrom: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
})
imageSchemaTrash.index({ createdAt: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 });

export const imageTrash = mongoose.models.image_schema_trash || mongoose.model('image_schema_trash', imageSchemaTrash)