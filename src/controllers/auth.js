import * as authServices from '../services/auth.js';

import { generateGoogleOAuthUrl } from '../utils/googleOAuth2.js';

const setupSession = (res, session) => {
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
};

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

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshController = async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;
  const session = await authServices.refreshSession({
    refreshToken,
    sessionId,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const signoutController = async (req, res) => {
  const { sessionId } = req.cookies;
  if (sessionId) {
    await authServices.signout(sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const requestResetEmailController = async (req, res) => {
  await authServices.requestResetToken(req.body.email);
  res.json({
    status: 200,
    message: 'Reset password email was successfully sent!',
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await authServices.resetPassword(req.body);

  res.json({
    status: 200,
    message: 'Password was successfully reset!',
    data: {},
  });
};

export const getGoogleOauthUrlController = async (req, res) => {
  const url = generateGoogleOAuthUrl();

  res.json({
    status: 200,
    message: 'Successfully create Google Oauth url',
    data: {
      url,
    },
  });
};

export const loginWithGoogleOAuthController = async (req, res) => {
  const session = await authServices.signinOrSignupWithGoogleOAuth(
    req.body.code,
  );
  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully login by Google OAuth',
    data: {
      accessToken: session.accessToken,
    },
  });
};
