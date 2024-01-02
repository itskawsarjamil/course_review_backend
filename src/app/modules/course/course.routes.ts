import express from 'express';
import { CourseController } from './course.controller';
import { validateRequest } from '../../../middleware/validateRequest';
import { courseValidation } from './course.validation';
import auth from '../../../middleware/auth';

const courseRouter = express.Router();
export const RoutesOfCourses = express.Router();

RoutesOfCourses.get('/', CourseController.getAllCourse);

courseRouter.post(
  '/',
  auth('admin'),
  validateRequest(courseValidation.createCourseValidationSchema),
  CourseController.createCourse,
);

courseRouter.get('/best', CourseController.getBestCourse);

RoutesOfCourses.put(
  '/:courseId',
  auth('user'),
  validateRequest(courseValidation.updateCreateCourseValidationSchema),
  CourseController.updateACourse,
);

RoutesOfCourses.get(
  '/:courseId/reviews',
  CourseController.getACourseWithReviews,
);

export const CourseRoutes = courseRouter;
