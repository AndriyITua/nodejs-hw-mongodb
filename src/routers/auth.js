import { Router } from 'express';

import * as authController from '../controllers/auth.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';

import { userSignupSchema, userSigninSchema } from '../validation/users.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(userSignupSchema),
  ctrlWrapper(authController.signupController),
);

authRouter.post(
  '/login',
  validateBody(userSigninSchema),
  ctrlWrapper(authController.signinController),
);

authRouter.post('/refresh', ctrlWrapper(authController.refreshController));

authRouter.post('/logout', ctrlWrapper(authController.signoutController));

export default authRouter;
