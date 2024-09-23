import { Router } from 'express';

import * as contactControllers from '../controllers/contacts.js';

import authenticate from '../middlewares/authenticate.js';
import isValidId from '../middlewares/isValidId.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';

import {
  contactAddSchema,
  contactPatchSchema,
} from '../validation/contacts.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

// Отримання колекції всіх контактів
contactsRouter.get(
  '/',
  ctrlWrapper(contactControllers.getAllContactsController),
);

// Отримання одного контакту
contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactControllers.getContactByIdController),
);

// Додавання одного контакту
contactsRouter.post(
  '/',
  validateBody(contactAddSchema),
  ctrlWrapper(contactControllers.addContactController),
);

// Оновлення або додавання одного контакту
contactsRouter.put(
  '/:contactId',
  isValidId,
  validateBody(contactAddSchema),
  ctrlWrapper(contactControllers.upsertContactController),
);

// Тільки оновлює об'єкт, який вже є в БД
contactsRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(contactPatchSchema),
  ctrlWrapper(contactControllers.patchContactController),
);

contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactControllers.deleteContactController),
);

export default contactsRouter;
