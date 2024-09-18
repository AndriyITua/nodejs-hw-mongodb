import Contact from '../db/models/Contact.js';

import calculatePaginationData from '../utils/calculatePaginationData.js';

import { SORT_ORDER } from '../constants/index.js';

export const getContacts = async ({
  perPage,
  page,
  sortBy = '_id',
  sortOrder = SORT_ORDER[0],
  filter = {},
}) => {
  const skip = (page - 1) * perPage;

  const contactQuery = Contact.find();

  if (filter.isFavourite) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

  if (filter.type) {
    contactQuery.where('contactType').equals(filter.type);
  }

  const contacts = await contactQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });
  const count = await Contact.find().merge(contactQuery).countDocuments();

  const paginationData = calculatePaginationData({ count, perPage, page });

  return {
    data: contacts,
    page,
    perPage,
    totalItems: count,
    ...paginationData,
  };
};

export const getContactById = (contactId) => Contact.findById(contactId);

export const createContact = (payload) => Contact.create(payload);

export const updateContact = async (filter, data, options = {}) => {
  const rawResult = await Contact.findOneAndUpdate(filter, data, {
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
