import { HttpError } from 'http-errors';

const errorHandler = (error, req, res, next) => {
  // Перевірка, чи отримали ми помилку від createHttpError
  if (error instanceof HttpError) {
    res.status(error.status).json({
      status: error.status,
      message: error.name,
      data: error,
    });
    return;
  }

  const { status = 500, message } = error;
  res.status(status).json({
    status,
    message: 'Something went wrong',
    data: message,
  });
};

export default errorHandler;
