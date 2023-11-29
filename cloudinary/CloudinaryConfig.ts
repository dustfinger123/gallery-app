// cloudinaryConfig.ts
import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';

config(); // Load environment variables from .env.local

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_cloud_name,
  api_key: process.env.NEXT_PUBLIC_api_key,
  api_secret: process.env.NEXT_PUBLIC_api_secret,
});

export default cloudinary;
