import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY 
});

const uploadOnCloudinary = async (localPath) => {
    try {
        // console.log(localPath)
        // if (!localPath) return null
        //upload file path on cloud
        const response = await cloudinary.uploader.upload(localPath, {
            resource_type : "auto"
        })
        //file upload success
        // alert("File is uploaded successfully!")
        console.log("File is uploaded successfully!");
        //removeing temp files on successfull upload
        fs.unlinkSync(localPath)
        return response;
    } catch (error) {
        fs.unlinkSync(localPath)//remove the local saved temp file as the upload operation failed
        // we remove the local file since it might me malicious and can harm server
        return null; 
    }
}

export {uploadOnCloudinary}