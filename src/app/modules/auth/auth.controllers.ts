import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);
  // const { accessToken } = result;
  // console.log(result);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successful',
    data: {
      user: result.val,
      token: result.accessToken,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const PasswordData = req.body;

  const result = await authServices.changePassword(req.user, PasswordData);
  const message =
    result === null
      ? 'Password change failed. Ensure the new password is unique and not among the last 2 used'
      : 'Password changed successfully';
  sendResponse(res, {
    statusCode: result === null ? httpStatus.BAD_REQUEST : httpStatus.OK,
    success: result === null ? false : true,
    message,
    data: result,
  });
});

export const authController = {
  loginUser,
  changePassword,
};
