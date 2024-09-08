import Contact from '../db/models/Contact.js';

export const getAllContacts = () => Contact.find();

export const getContactById = (contactId) => Contact.findById(contactId);

export const createContact = (payload) => Contact.create(payload);

export const updateContact = async (filter, data, options = {}) => {
  const rawResult = await Contact.findOneAndUpdate(filter, data, {
    new: true,
    includeResultMetadata: true,
    ...options,
    // upsert: true,  - добавляємо при умові, що ми хочемо об'єкт з новим id добавити
    //зараз upsert: null за замовчуванням
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = (filter) => Contact.findOneAndDelete(filter);
