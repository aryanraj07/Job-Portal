import cloudinary from "@/lib/cloudinary";
import streamifier from "streamifier";

export default function uploadToCloudinary(buffer: Buffer) {
  return new Promise<any>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "resumes",
      },
      (error, result) => {
        if (error) return reject(error);

        resolve(result);
      },
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
}
