import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import env from './utils/env.js';

import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import swaggerDocs from './middlewares/swaggerDocs.js';
// import logger from './middlewares/logger.js';

import authRouter from './routers/auth.js';
import contactsRouter from './routers/contacts.js';

export const setupServer = () => {
  const app = express();

  // app.use(logger);

  // Мідлавара, що дозволяє робити запит з різних ip-адрес
  app.use(cors());

  // Мідлвара, що перетворює формат буфер на об'єкт в форматі json
  app.use(express.json());

  // Парсинг cookies, щоб побачити refreshToken та sessionId
  app.use(cookieParser());

  // Надаю доступ фронтенду до статичних файлів в цій папці
  app.use(express.static('uploads'));

  app.use('/auth', authRouter);

  // Запит починається на /contacts (end point) | Обробник запиту знаходиться в об'єкті contactsRouter
  app.use('/contacts', contactsRouter);

  app.use('/api-docs', swaggerDocs());

  app.use(notFoundHandler);

  app.use(errorHandler);

  const port = Number(env('PORT', '3000'));

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};
