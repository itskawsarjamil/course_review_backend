import express from 'express';
import { validateRequest } from '../../../middleware/validateRequest';
import { userValidation } from '../user/user.validation';
import { userController } from '../user/user.controller';
import { AuthValidation } from './auth.validation';
import { authController } from './auth.controllers';

const router = express.Router();

router.post(
  '/register',
  validateRequest(userValidation.createUserValidationSchema),
  userController.createUser,
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  authController.loginUser,
);

export const AuthRoutes = router;
