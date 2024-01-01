import { z } from 'zod';

const CreateCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    createdBy: z.string(),
  }),
});

const UpdateCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    createdBy: z.string().optional(),
  }),
});

export const CategoryValidation = {
  CreateCategoryValidationSchema,
  UpdateCategoryValidationSchema,
};
