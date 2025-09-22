import cloudinaryModule from "cloudinary";
const cloudinary = cloudinaryModule.v2;
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
  cloud_name: "dgthdmczs",
  api_key: "262352987669317",
  api_secret: "4sduMYX1OKzTiFlOLBNHFKMBkpw"
});

// Function to get all files recursively from a directory
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      // Only include image and PDF files
      if (/\.(jpg|jpeg|png|gif|pdf)$/i.test(file)) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

const publicDir = path.join(__dirname, "../../public");
const images = [
  ...getAllFiles(publicDir)
];

console.log(`Found ${images.length} assets to upload:`);
images.forEach(img => console.log(`- ${path.basename(img)}`));

for (const imgPath of images) {
  try {
    const result = await cloudinary.uploader.upload(imgPath);
    console.log(`${path.basename(imgPath)}: ${result.secure_url}`);
  } catch (error) {
    console.error(`Error uploading ${imgPath}:`, error);
  }
}