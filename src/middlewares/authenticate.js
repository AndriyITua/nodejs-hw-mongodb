import createHttpError from 'http-errors';

import * as authServices from '../services/auth.js';

const authenticate = async (req, res, next) => {
  // const { authorization } = req.headers;
  const authorization = req.get('Authorization');

  // Перевірка чи прийшов токен з фронтенду
  if (!authorization) {
    return next(createHttpError(401, 'Authorization header not found'));
  }

  // split перетворює строку на масив
  const [bearer, token] = authorization.split(' ');

  // Перевіряємо чи перше слово Bearer
  if (bearer !== 'Bearer') {
    return next(
      createHttpError(401, 'Authorization header must have Bearer type'),
    );
  }

  // Перевіряємо чи є сесія з токеном
  const session = await authServices.findSessionByAccessToken(token);
  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  // Перевіряємо чи не закінчився час дії токену
  if (new Date() > session.accessTokenValidUntil) {
    return next(createHttpError(401, 'Access token expired'));
  }

  // Пошук користувача по id
  const user = await authServices.findUser({ _id: session.userId });
  if (!user) {
    return next(createHttpError(401, 'User not found'));
  }

  // Зберігаємо в req-запиті інформацію про юзера
  req.user = user;

  next();
};

export default authenticate;
