import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Course } from '../course/course.model';
import { TReview } from './review.interface';
import { Review } from './review.model';

const createReviewIntoDB = async (payload: TReview) => {
  const isCourseExist = await Course.findById(payload.courseId);

  if (!isCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'CourseID is not valid');
  }
  const result1 = await Review.create(payload);
  const result = await Review.findById(result1['_id']).select('-__v');
  return result;
};

export const ReviewServices = {
  createReviewIntoDB,
};
