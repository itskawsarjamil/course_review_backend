import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    username: z.string().default('user'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    role: z.enum(['user', 'admin']),
  }),
});

export const userValidation = {
  createUserValidationSchema,
};
