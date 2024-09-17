import express from 'express';
import cors from 'cors';
import env from './utils/env.js';

import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import logger from './middlewares/logger.js';

import contactsRouter from './routers/contacts.js';

export const setupServer = () => {
  const app = express();

  // app.use(logger);
  // Мідлавара, що дозволяє робити запит з різних ip-адрес
  app.use(cors());
  // Мідлвара, що перетворює формат буфер на об'єкт в форматі json
  app.use(express.json());

  // Запит починається на /contacts (end point) | Обробник запиту знаходиться в об'єкті contactsRouter
  app.use('/contacts', contactsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const port = Number(env('PORT', '3000'));

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};
