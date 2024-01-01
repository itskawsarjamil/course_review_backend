import { Schema, model } from 'mongoose';
import { TReview } from './review.interface';

const reviewschema = new Schema<TReview>({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'course',
  },
  rating: {
    type: Number,
    required: true,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5'],
  },
  review: String,
});

export const Review = model<TReview>('review', reviewschema);
