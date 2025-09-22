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

const assetsDir = path.join(__dirname, "../assets");
const publicDir = path.join(__dirname, "../../public");
const images = [
  ...getAllFiles(assetsDir),
  ...getAllFiles(publicDir).filter(file => path.basename(file) === 'og-image.png' || path.basename(file) === 'logo.png')
];

console.log(`Found ${images.length} assets to upload:`);
images.forEach(img => console.log(`- ${path.relative(assetsDir, img)}`));

for (const imgPath of images) {
  try {
    const relativePath = path.relative(assetsDir, imgPath);
    let folderName = '';
    
    if (relativePath.startsWith('..')) {
      // Handle public folder files
      const publicRelativePath = path.relative(publicDir, imgPath);
      folderName = publicRelativePath.includes('/') ? path.dirname(publicRelativePath).replace(/\\/g, '/') : '';
    } else {
      // Handle assets folder files
      folderName = path.dirname(relativePath).replace(/\\/g, '/');
    }
    
    const uploadOptions = folderName && folderName !== '.' ? { folder: folderName } : {};

    const result = await cloudinary.uploader.upload(imgPath, uploadOptions);
    console.log(`${path.basename(imgPath)}: ${result.secure_url}`);
  } catch (error) {
    console.error(`Error uploading ${imgPath}:`, error);
  }
}