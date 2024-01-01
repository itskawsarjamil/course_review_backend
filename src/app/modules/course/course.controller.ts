import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await CourseServices.createCourseIntoDB(payload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});

const getAllCourse = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await CourseServices.getAllCoursefromDB(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getACourseWithReviews = catchAsync(async (req, res) => {
  const courseId = req.params.courseId;
  const result = await CourseServices.getACourseWithReviewsfromDB(courseId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course and Reviews retrieved successfully',
    data: result,
  });
});

const updateACourse = catchAsync(async (req, res) => {
  const id = req.params.courseId;
  const payload = req.body;
  const result = await CourseServices.updateACourse(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Updated Successfully',
    data: result,
  });
});

const getBestCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.getBestCourseFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Best Course retrieved successfully',
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourse,
  getACourseWithReviews,
  updateACourse,
  getBestCourse,
};
