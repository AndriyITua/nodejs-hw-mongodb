import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import env from './utils/env.js';

import * as contactServices from './services/contacts.js';

const setupServer = () => {
  const app = express();

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(logger);
  app.use(cors());
  app.use(express.json());

  // Отримання колекції всіх контактів
  app.get('/contacts', async (req, res) => {
    const data = await contactServices.getAllContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts',
      data,
    });
  });

  // Отримання одного контакту
  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const data = await contactServices.getContactById(contactId);

    if (!data) {
      return res.status(404).json({
        message: `Contact with id=${contactId} not found`,
      });
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data,
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url}not found`,
    });
  });

  app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
  });

  const port = Number(env('PORT', '3000'));

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};

export default setupServer;
