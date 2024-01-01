import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorMessage: string = Object.values(err.errors)
    .map((val) => `${val?.message}.`)
    .join(' ');

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage,
    stack: err?.stack,
  };
};

export default handleValidationError;
