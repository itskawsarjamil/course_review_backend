import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorMessage = `${err.value} is not a Valid ID`;

  const statusCode = 400;
  const stack = err?.stack;

  return {
    statusCode,
    message: 'Invalid ID',
    // errorSources,
    errorMessage,
    stack,
  };
};

export default handleCastError;
