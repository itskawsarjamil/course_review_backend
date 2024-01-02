/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TpasswordStore = {
  password: string;
  passwordChangedAt: Date;
};

export interface TUser extends Document {
  username: string;
  email: string;
  password: string;
  passwordChangedAt: Date;
  role: 'user' | 'admin';
  arrayofMetaDataOfPrevPass: TpasswordStore[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByCustomId(id: string): Promise<TUser>;

  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
