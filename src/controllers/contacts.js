import createHttpError from 'http-errors';
import * as contactServices from '../services/contacts.js';

export const getAllContactsController = async (req, res) => {
  const data = await contactServices.getAllContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const data = await contactServices.getContactById(contactId);

  if (!data) {
    throw createHttpError(404, `Contact with id=${contactId} not found`);
    //   const error = new Error(`Contact with id=${contactId} not found`);
    //   error.status = 404;
    //   throw error;

    //   return res.status(404).json({
    //     message: `Contact with id=${contactId} not found`,
    //   });
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data,
  });
};
