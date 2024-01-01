import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Category } from '../category/category.model';
import { TCourse } from './course.interface';
import { Course } from './course.model';
import { Review } from '../review/review.model';
import { TReview } from '../review/review.interface';
// import mongoose from 'mongoose';

const createCourseIntoDB = async (payload: TCourse) => {
  const startDate = new Date(payload.startDate);
  const endDate = new Date(payload.endDate);

  const durationInWeeks = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) / 7,
  );
  payload.durationInWeeks = durationInWeeks;

  const categoryInfo = await Category.findById(payload.categoryId);
  if (!categoryInfo) {
    throw new AppError(httpStatus.NOT_FOUND, 'category not found');
  }

  const result1 = await Course.create(payload);
  const result = await Course.findById(result1._id).select(
    '-createdAt -updatedAt -__v',
  );
  return result;
};

const getAllCoursefromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };

  //filtering
  const excludeFields = [
    'page',
    'limit',
    'sortBy',
    'sortOrder',
    'tags',
    'level',
  ];

  excludeFields.forEach((el) => delete queryObj[el]); // DELETING THE FIELDS SO THAT IT CAN'T MATCH OR FILTER EXACTLY

  if (query.level) {
    queryObj['details.level'] = query.level;
  }
  if (query.tags) {
    // queryObj['tags'] = { $elemMatch: { name: query.tags } };
    queryObj['tags.name'] = query.tags;
  }

  // SORTING
  let sortOrder = 'asc';
  let sortBy = 'createdAt'; // SET DEFAULT VALUE
  const sortObj: { [key: string]: 1 | -1 } = {};

  if (query.sortOrder) {
    sortOrder = query.sortOrder as string;
  }

  if (!query.sortBy) {
    if (sortOrder === 'desc') {
      sortObj['createdAt'] = -1;
    } else if (sortOrder === 'asc') {
      sortObj['createdAt'] = 1;
    }
  } else if (query.sortBy) {
    sortBy = query.sortBy as string;
    if (!sortBy.includes(',')) {
      sortObj[sortBy] = sortOrder === 'desc' ? -1 : 1;
    } else {
      sortBy
        .split(',')
        .forEach((el) => (sortObj[el] = sortOrder === 'desc' ? -1 : 1));
    }
  }

  //pagination
  let page = 1;
  let limit = 2;
  let skip = 0;
  if (query.page) {
    page = Number(query.page);
  }
  if (query.limit) {
    limit = Number(query.limit);
  }

  skip = (page - 1) * limit;
  const total = await Course.countDocuments({});
  const meta = { page, limit, total };
  const result = await Course.find(queryObj)
    .sort(sortObj)
    .skip(skip)
    .limit(limit)
    .select('-createdAt -updatedAt -__v');
  return { meta, result };
};

const getACourseWithReviewsfromDB = async (courseId: string) => {
  const reviews: TReview[] = await Review.find({ courseId }).select(
    '-_id -__v',
  );
  // console.log(reviewsCollection);

  const course = await Course.findById(courseId).select({
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
    'details._id': 0,
  });
  const result: Record<string, unknown> = {
    course,
    reviews,
  };
  return result;
};

const updateACourse = async (id: string, payload: Partial<TCourse>) => {
  const { tags, details, ...remaining } = payload;
  const updatedData: Record<string, unknown> = { ...remaining };
  // console.log(updatedData, '\n', payload);
  // const session = await mongoose.startSession();
  // await session.startTransaction();
  try {
    if (details && Object.keys(details).length) {
      for (const [key, value] of Object.entries(details)) {
        updatedData[`details.${key}`] = value;
      }
    }

    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        // runValidators: true,
        // session,
      },
    );
    // const updateTemporary = await Course.findById(id);
    // console.log(updatedBasicCourseInfo);

    if (!updatedBasicCourseInfo) {
      // console.log('inside !updatedBasicCourseInfo');
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to  update Basic Course Info',
      );
    }
    if (tags && tags.length > 0) {
      const deletedTags = tags
        .filter((el) => el.name && el.isDeleted)
        .map((el) => el.name);
      const deletedTagsResult = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            tags: { name: { $in: deletedTags } },
          },
        },
        {
          new: true,
          // runValidators: true,
          // session,
        },
      );
      // console.log('deletedTagsResult:', deletedTagsResult);
      if (!deletedTagsResult) {
        // console.log('xyz deleted tag');
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to update course details',
        );
      }
      const newTags = tags.filter((el) => el.name && !el.isDeleted);
      const newTagsResult = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            tags: { $each: newTags },
          },
        },
        {
          new: true,
          // runValidators: true,
          // session,
        },
      );
      if (!newTagsResult) {
        // console.log('xyz new tags');
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to update course tags',
        );
      }
    }

    // await session.commitTransaction();
    // await session.endSession();
    // console.log('xyz before last');
    const result = await Course.findById(id).select({
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
      'details._id': 0,
    });

    return result;
  } catch (err) {
    // console.log('Error:', err.message); // Log the error message
    // console.log('Error Stack:', err.stack);
    // await session.abortTransaction();
    // await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }
};

const getBestCourseFromDB = async () => {
  const result = await Review.aggregate([
    {
      $group: {
        _id: '$courseId',
        reviewCount: { $sum: 1 },
        averageRating: { $avg: '$rating' },
      },
    },
    {
      $sort: { reviewCount: -1, averageRating: -1 },
    },
    {
      $project: {
        _id: 1,
        reviewCount: 1,
        averageRating: { $round: ['$averageRating', 2] }, // Round to 2 decimal places
      },
    },
  ]);
  // console.log(result);

  // const bestCourseId = result ?? result[0]._id;
  const course = await Course.findById(result[0]['_id']).select({
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
    'details._id': 0,
  });
  // console.log(result, result[0]['_id']);
  // console.log(course);
  return {
    course,
    averageRating: result[0]['averageRating'],
    reviewCount: result[0]['reviewCount'],
  };
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursefromDB,
  updateACourse,
  getACourseWithReviewsfromDB,
  getBestCourseFromDB,
};
