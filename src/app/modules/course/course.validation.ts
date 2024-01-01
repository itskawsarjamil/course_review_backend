import { z } from 'zod';

const CourseDetailsValidationSchema = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  description: z.string(),
});

const tagValidationSchema = z.object({
  name: z.string(),
  isDeleted: z.boolean().default(false).optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    instructor: z.string(),
    categoryId: z.string(),
    price: z.number().min(0, 'Price should be non-negative'),
    tags: z.array(tagValidationSchema),
    startDate: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        'Invalid startDate format.Give data in this format: YYYY-MM-DD',
      ),
    endDate: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        'Invalid endDate format. Give data in this format: YYYY-MM-DD ',
      ),
    language: z.string(),
    provider: z.string(),
    details: CourseDetailsValidationSchema,
  }),
});
const updateCourseDetailsValidationSchema = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
  description: z.string().optional(),
});

const updateTagValidationSchema = z.object({
  name: z.string().optional(),
  isDeleted: z.boolean().default(false).optional(),
});

const updateCreateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    instructor: z.string().optional(),
    categoryId: z.string().optional(),
    price: z.number().min(0, 'Price should be non-negative').optional(),
    tags: z.array(updateTagValidationSchema).optional(),
    startDate: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        'Invalid startDate format. Give data in this format: YYYY-MM-DD ',
      )
      .optional(),
    endDate: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        'Invalid endDate format. Give data in this format: YYYY-MM-DD ',
      )
      .optional(),
    language: z.string().optional(),
    provider: z.string().optional(),
    details: updateCourseDetailsValidationSchema.optional(),
  }),
});

export const courseValidation = {
  createCourseValidationSchema,
  updateCreateCourseValidationSchema,
};
