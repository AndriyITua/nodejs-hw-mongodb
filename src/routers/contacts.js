import { Router } from 'express';

import {
  getAllContactsController,
  getContactByIdController,
} from '../controllers/contacts.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

// Отримання колекції всіх контактів
contactsRouter.get('/', ctrlWrapper(getAllContactsController));

// Отримання одного контакту
contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdController));

export default contactsRouter;
