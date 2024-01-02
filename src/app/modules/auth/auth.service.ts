import { ObjectId } from 'mongodb';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { TpasswordStore } from '../user/user.interface';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.findOne({ username: payload.username });

  // console.log(user);
  // console.log(user?._id.toString());

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    _id: user?._id.toString(),
    role: user.role,
    email: user.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  const val = {
    _id: user?._id.toString(),
    username: user?.username,
    email: user?.email,
    role: user?.role,
  };
  return {
    val,
    accessToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { currentPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userData._id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  //checking if the password is correct

  if (
    !(await User.isPasswordMatched(payload.currentPassword, user?.password))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  //here we will execute password changing condition/rules

  if (payload.currentPassword === payload.newPassword) {
    // throw new AppError(
    //   httpStatus.FORBIDDEN,
    //   'Password change failed. Ensure the new password is unique and not among the last 2 used',
    // );
    return null;
  }
  if (await User.isPasswordMatched(payload.newPassword, user?.password)) {
    // throw new AppError(
    //   httpStatus.FORBIDDEN,
    //   'Password change failed. Ensure the new password is unique and not among the last 2 used',
    // );
    return null;
  }

  let MetaDataOfPrevPassArray: TpasswordStore[] = [];

  if (user?.arrayofMetaDataOfPrevPass?.length) {
    MetaDataOfPrevPassArray = user?.arrayofMetaDataOfPrevPass;
  }

  const metadataofPrevPassword: TpasswordStore = {
    password: user?.password,
    passwordChangedAt: user?.passwordChangedAt,
  };

  for (const prevPassInfo of MetaDataOfPrevPassArray) {
    if (
      await User.isPasswordMatched(
        payload.currentPassword,
        prevPassInfo?.password,
      )
    ) {
      // throw new AppError(
      //   httpStatus.FORBIDDEN,
      //   'Password change failed. Ensure the new password is unique and not among the last 2 used',
      // );
      return null;
    }
  }

  if (MetaDataOfPrevPassArray?.length >= 2) {
    MetaDataOfPrevPassArray.pop();
  }

  MetaDataOfPrevPassArray.unshift(metadataofPrevPassword);

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  const result1 = await User.findOneAndUpdate(
    {
      _id: new ObjectId(userData._id),
      role: userData.role,
      email: userData.email,
    },
    {
      password: newHashedPassword,
      arrayofMetaDataOfPrevPass: MetaDataOfPrevPassArray,
    },
    {
      new: true,
    },
  );
  const result = await User.findById(result1?._id).select(
    '_id username email role createdAt updatedAt',
  );
  return result;
};

export const authServices = {
  loginUser,
  changePassword,
};
