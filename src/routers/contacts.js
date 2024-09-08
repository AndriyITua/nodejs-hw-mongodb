import { Router } from 'express';

import * as contactControllers from '../controllers/contacts.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

// Отримання колекції всіх контактів
contactsRouter.get(
  '/',
  ctrlWrapper(contactControllers.getAllContactsController),
);

// Отримання одного контакту
contactsRouter.get(
  '/:contactId',
  ctrlWrapper(contactControllers.getContactByIdController),
);

// Додавання одного контакту
contactsRouter.post('/', ctrlWrapper(contactControllers.addContactController));

// Оновлення або додавання одного контакту
contactsRouter.put(
  '/:contactId',
  ctrlWrapper(contactControllers.upsertContactController),
);

// Тільки оновлює об'єкт, який вже є в БД
contactsRouter.patch(
  '/:contactId',
  ctrlWrapper(contactControllers.patchContactController),
);

contactsRouter.delete(
  '/:contactId',
  ctrlWrapper(contactControllers.deleteContactController),
);

export default contactsRouter;
