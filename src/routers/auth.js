import { Router } from 'express';

import * as authController from '../controllers/auth.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';

import {
  userSignupSchema,
  userSigninSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
  userLoginWithGoogleOAuthSchema,
} from '../validation/users.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(userSignupSchema),
  ctrlWrapper(authController.signupController),
);

authRouter.get(
  '/google-oauth-url',
  ctrlWrapper(authController.getGoogleOauthUrlController),
);

authRouter.post(
  '/confirm-google',
  validateBody(userLoginWithGoogleOAuthSchema),
  ctrlWrapper(authController.loginWithGoogleOAuthController),
);

authRouter.post(
  '/login',
  validateBody(userSigninSchema),
  ctrlWrapper(authController.signinController),
);

authRouter.post('/refresh', ctrlWrapper(authController.refreshController));

authRouter.post('/logout', ctrlWrapper(authController.signoutController));

authRouter.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(authController.requestResetEmailController),
);

authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(authController.resetPasswordController),
);

export default authRouter;
