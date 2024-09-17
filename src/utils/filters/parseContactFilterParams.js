import parseBoolean from './parseBoolean.js';
import parseString from './parseString.js';

const parseContactFilterParams = ({ isFavourite, contactType }) => {
  const parsedisFavourite = parseBoolean(isFavourite);
  const parsedcontactType = parseString(contactType);

  return {
    isFavourite: parsedisFavourite,
    contactType: parsedcontactType,
  };
};

export default parseContactFilterParams;
