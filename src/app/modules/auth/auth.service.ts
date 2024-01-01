import { TLoginUser } from './auth.interface';

const loginUser = (payload: TLoginUser) => {
  console.log(payload);
  return null;
};

export const authServices = {
  loginUser,
};
