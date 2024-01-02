import express from 'express';
import { validateRequest } from '../../../middleware/validateRequest';
import { ReviewVAlidation } from './review.validation';
import { ReviewController } from './review.controller';
import auth from '../../../middleware/auth';

export const ReviewRoutes = express.Router();

ReviewRoutes.post(
  '/',
  auth('user'),
  validateRequest(ReviewVAlidation.createReviewValidationSchema),
  ReviewController.createReview,
);
