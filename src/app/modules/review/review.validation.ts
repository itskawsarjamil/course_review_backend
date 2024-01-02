import { z } from 'zod';

const createReviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string(),
    rating: z
      .number()
      .int()
      .min(1, { message: 'Rating must be at least 1' })
      .max(5, { message: 'Rating cannot be more than 5' }),
    review: z.string(),
    createdBy: z.string(),
  }),
});
const updateReviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string().optional(),
    rating: z
      .number()
      .int()
      .min(1, { message: 'Rating must be at least 1' })
      .max(5, { message: 'Rating cannot be more than 5' })
      .optional(),
    review: z.string().optional(),
    // createdBy: z.string().optional(),
  }),
});

export const ReviewVAlidation = {
  createReviewValidationSchema,
  updateReviewValidationSchema,
};
