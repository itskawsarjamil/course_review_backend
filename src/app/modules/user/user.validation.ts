import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    username: z.string(),
    email: z.string().email('Invalid email format'),
    password: z.string(),
    role: z.enum(['user', 'admin']).default('user'),
  }),
});

export const userValidation = {
  createUserValidationSchema,
};
