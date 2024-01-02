import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type passStore = {
  password: string;
  passwordChangedAt: Date;
};

export type TUser = {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  passwordHolder?: [passStore];
};

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
