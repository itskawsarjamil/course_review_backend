import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'Id is required.' }),
    password: z.string({ required_error: 'Password is  required' }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    currentPassword: z.string({
      required_error: 'current password is required',
    }),
    newPassword: z.string({ required_error: 'new Password is required' }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
};
