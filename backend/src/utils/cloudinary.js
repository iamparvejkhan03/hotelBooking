import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (img) => {
    try {
        return await cloudinary.uploader.upload(img, (error, result) => {
            if(error){
                throw new Error(error);
            }
            fs.unlinkSync(img);
            return result;
        })
    } catch (error) {
        throw new Error(error);
    }
}

const deleteFromCloudinary = async (img) => {
    try {
        const public_id = img.split('/')[img.split('/').length -1].split('.')[0];
        const deletedImage = await cloudinary.uploader.destroy(public_id, {resource_type:'image'});

        if(deletedImage){
            return true;
        }
    } catch (error) {
        throw new Error(error);
    }
}

export { uploadOnCloudinary, deleteFromCloudinary };