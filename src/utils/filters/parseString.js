import { contactTypes } from '../../constants/contacts.js';

const parseString = (value) => {
  if (typeof value !== 'string') return;
  if (typeof value === 'number') return;

  if (contactTypes.includes(value)) {
    return value;
  }
};

export default parseString;
