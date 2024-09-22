import * as authServices from '../services/auth.js';

export const signupController = async (req, res) => {
  const newUser = await authServices.signup(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: newUser,
  });
};

export const signinController = async (req, res) => {
  const session = await authServices.signin(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    // Фронтенд не побачить цей токен
    httpOnly: true,
    // Час життя
    expire: new Date(Date.now() + session.refreshTokenValidUntil),
  });

  res.cookie('sessionId', session._id, {
    // Фронтенд не побачить цей токен
    httpOnly: true,
    // Час життя
    expire: new Date(Date.now() + session.refreshTokenValidUntil),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
