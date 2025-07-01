import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (image) => {
    try {
        return await cloudinary.uploader.upload(image, (error, result) => {
            if(error){
                throw new Error(error);
            }
            fs.unlinkSync(image);
            return result;
        })
    } catch (error) {
        throw new Error(error);
    }
}

const deleteFromCloudinary = async (image) => {
    try {
        if(image instanceof String){
            const public_id = image.split('/')[image.split('/').length -1].split('.')[0];
            const deletedImage = await cloudinary.uploader.destroy(public_id, {resource_type:'image'});

            if(deletedImage){
                return true;
            }
        }else if(image instanceof Array){
            image.forEach(async img => {
                const public_id = img.split('/')[img.split('/').length -1].split('.')[0];
                const deletedImage = await cloudinary.uploader.destroy(public_id, {resource_type:'image'});
                if(deletedImage){
                    return true;
                }
            })
        }else{
            return false;
        }
    } catch (error) {
        throw new Error(error);
    }
}

export { uploadOnCloudinary, deleteFromCloudinary };