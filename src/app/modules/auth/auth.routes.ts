import express from 'express';
import { validateRequest } from '../../../middleware/validateRequest';
import { userValidation } from '../user/user.validation';
import { userController } from '../user/user.controller';
import { AuthValidation } from './auth.validation';
import { authController } from './auth.controllers';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../../middleware/auth';

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
router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  authController.changePassword,
);
export const AuthRoutes = router;
