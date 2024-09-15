import Joi from 'joi';

import { contactTypes, phoneNumberRegexp } from '../constants/contacts.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().pattern(phoneNumberRegexp).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .allow(null),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .valid(...contactTypes)
    .default('personal')
    .required(),
});

export const contactPatchSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().pattern(phoneNumberRegexp),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .allow(null),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .valid(...contactTypes)
    .default('personal'),
});
