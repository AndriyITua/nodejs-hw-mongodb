import { Schema, model } from 'mongoose';

import { contactTypes, phoneNumberRegexp } from '../../constants/contacts.js';

import { handleSaveError, setUpdateOptions } from './hooks.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      min: 3,
      max: 20,
      required: true,
    },
    phoneNumber: {
      type: String,
      match: phoneNumberRegexp,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: contactTypes,
      required: true,
      default: 'personal',
    },
    photo: {
      type: String,
      required: false,
    },

    // Користувач, що добавив контакт
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

contactSchema.post('save', handleSaveError);

// Перед тим як зробити операцію "знайди і онови" виконай функцію setUpdateOptions
contactSchema.pre('findOneAndUpdate', setUpdateOptions);

contactSchema.post('findOneAndUpdate', handleSaveError);

const Contact = model('contacts-1', contactSchema);

export const sortFields = [
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
  'createdAt',
  'updatedAt',
];

export default Contact;
