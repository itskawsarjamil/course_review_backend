import { Schema, model } from 'mongoose';
import { TUser, TpasswordStore, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import { ObjectId } from 'mongodb';

const passwordStoreSchema = new Schema<TpasswordStore>({
  password: {
    type: String,
  },
  passwordChangedAt: {
    type: Date,
  },
});

const userSchema = new Schema<TUser, UserModel>(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'username is required'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'email is required'],
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    passwordChangedAt: {
      type: Date,
      default: new Date(),
    },
    role: {
      type: String,
      required: [true, 'role is required'],
      enum: ['user', 'admin'],
      default: 'user',
    },
    arrayofMetaDataOfPrevPass: {
      type: [passwordStoreSchema],
      default: [],
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ _id: new ObjectId(id) });
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>('user', userSchema);
