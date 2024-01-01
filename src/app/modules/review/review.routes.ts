import express from 'express';
import { validateRequest } from '../../../middleware/validateRequest';
import { ReviewVAlidation } from './review.validation';
import { ReviewController } from './review.controller';

export const ReviewRoutes = express.Router();

ReviewRoutes.post(
  '/',
  validateRequest(ReviewVAlidation.createReviewValidationSchema),
  ReviewController.createReview,
);
