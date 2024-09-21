import createHttpError from 'http-errors';

export const handleSaveError = (error, data, next) => {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    throw createHttpError(409, `${error.message}`);
  }

  if (error) {
    throw createHttpError(400, `${error.message}`);
  }
  next();
};

export const setUpdateOptions = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};
