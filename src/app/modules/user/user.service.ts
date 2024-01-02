import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const isUserExist = await User.findOne({ email: payload.email });
  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is already exist');
  }
  const result1 = await User.create(payload);
  const result = await User.findById(result1._id).select('-__v -password ');
  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find().select('-__v -password ');
  return result;
};

export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
};
