import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';
import createHttpError from 'http-errors';

// Завантажені файли будуть збережені у визначеній директорії з унікальними іменами
const storage = multer.diskStorage({
  destionation: function (req, file, callback) {
    callback(null, TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}_${file.originalname}`;
    callback(null, filename);
  },
});

// Макс. розмір 5 мб
const limits = {
  fileSize: 1024 * 1024 * 5,
};

// Обмежити надсилання на певні файли
const fileFilter = function (req, file, callback) {
  // Ім'я файлу перетворюємо на масив та вирізаємо останню частину
  const extension = file.originalname.split('.').pop();
  if (extension === 'exe') {
    return callback(createHttpError(400, '.exe not valid extension'));
  }

  callback(null, true);
};

export const upload = multer({ storage, limits, fileFilter });
