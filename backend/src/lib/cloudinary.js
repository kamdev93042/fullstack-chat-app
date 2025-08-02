import { v2 as cloudinary} from "cloudinary"

import {config} from "dotenv"

config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary //just to see when we will upload any images we can see that in cloudinary bucket