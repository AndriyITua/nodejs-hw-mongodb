// Бібліотека яка з json буде робити html сторінку
import swaggerUI from 'swagger-ui-express';
import { readFileSync } from 'node:fs';
import createHttpError from 'http-errors';

import { SWAGGER_PATH } from '../constants/index.js';

// Функція, що повертатиме 2 мідлвари
const swaggerDocs = () => {
  try {
    // Читаємо зміст документації (swagger) у вигляді json
    const swaggerContent = readFileSync(SWAGGER_PATH, 'utf-8');
    // Перетворюємо на об'єкт
    const swaggerData = JSON.parse(swaggerContent);
    // Перетворимо об'єкт на реальну документацію з двох мідлвар
    return [...swaggerUI.serve, swaggerUI.setup(swaggerData)];
  } catch {
    return (rew, res, next) =>
      next(createHttpError(500, 'Cannot find swagger docs'));
  }
};

export default swaggerDocs;
