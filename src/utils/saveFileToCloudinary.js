import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'node:fs/promises';

import env from './env.js';

const cloud_name = env('CLOUDINARY_CLOUD_NAME');
const api_key = env('CLOUDINARY_API_KEY');
const api_secret = env('CLOUDINARY_API_SECRET');

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

// Передаєио шлях і папку
const saveFileToCloudinary = async (file, folder) => {
  // Завантажує в обрану папку на хмарне сховище
  const response = await cloudinary.uploader.upload(file.path, { folder });
  // Видаляє з папки temp
  await fs.unlink(file.path);
  // Повертає шлях
  return response.secure_url;
};

export default saveFileToCloudinary;
