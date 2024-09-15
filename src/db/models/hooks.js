import createHttpError from 'http-errors';

export const handleSaveError = (error, data, next) => {
  if (error) {
    throw createHttpError(400, `${error.message}`);
  }
  //   error.status = 400;
  next();
};

export const setUpdateOptions = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};
