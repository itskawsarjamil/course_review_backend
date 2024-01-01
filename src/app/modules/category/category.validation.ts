import { z } from 'zod';

const CreateCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});

const UpdateCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});

export const CategoryValidation = {
  CreateCategoryValidationSchema,
  UpdateCategoryValidationSchema,
};
