import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import debug from "debug";
const log = debug("app:cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//upload received file to cloudinary and return url
const fileUploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(
      localFilePath,
      { resource_type: "auto", timeout: 60000 },
      function (error, result) {
        log(`file uploaded on cloudinary ${result}`);
      },
    );
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove file from local storage if file upload failed
    console.log(error);
    return null;
  }
};

export default fileUploadOnCloudinary;
