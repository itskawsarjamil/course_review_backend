import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await userServices.createUserIntoDB(data);
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'User create successfully',
  });
});

export const userController = { createUser };
