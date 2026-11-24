
import { config } from "dotenv";

// Load environment variables first
config({ path: "./config.env" });

import app from "./app.js";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary configuration:", {
  cloud_name: cloudinary.config().cloud_name,
  api_key_loaded: !!cloudinary.config().api_key,
  api_secret_loaded: !!cloudinary.config().api_secret,
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});
