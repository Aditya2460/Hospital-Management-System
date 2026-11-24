
import { config } from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { fileURLToPath } from "url";

config({ path: "./.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
  debug: true,
});

// Get the local image path
const imagePath = fileURLToPath(
  new URL("./test-image.jpg", import.meta.url)
);

try {
  // Test authentication
  const pingResult = await cloudinary.api.ping();
  console.log("CLOUDINARY CONNECTION SUCCESS:", pingResult);

  // Test local image upload
  const uploadResult = await cloudinary.uploader.upload(
    imagePath,
    {
      folder: "HOSPITAL_MANAGEMENT_SYSTEM_TEST",
      resource_type: "image",
    }
  );

  console.log("UPLOAD SUCCESSFUL!");
  console.log("Public ID:", uploadResult.public_id);
  console.log("Image URL:", uploadResult.secure_url);

}  catch (error) {
  console.log("FULL CLOUDINARY ERROR:");
  console.dir(error, { depth: 10 });

  console.log("RESPONSE:", error.response);
  console.log("RESPONSE HEADERS:", error.response?.headers);
  console.log("RESPONSE BODY:", error.response?.data);
}
