import parseBoolean from './parseBoolean.js';
import parseString from './parseString.js';

const parseContactFilterParams = ({ isFavourite, type }) => {
  const parsedisFavourite = parseBoolean(isFavourite);
  const parsedcontactType = parseString(type);

  return {
    isFavourite: parsedisFavourite,
    type: parsedcontactType,
  };
};

export default parseContactFilterParams;
