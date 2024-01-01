import { ZodError } from 'zod';
import { TGenericErrorResponse } from '../interface/error';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const statusCode = 400;
  const errorMessage = err.issues
    ?.map(
      (issue) => `${issue?.path[issue.path.length - 1]} is ${issue?.message}.`,
    )
    .join(' ');

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage,
    stack: err?.stack,
  };
};

export default handleZodError;
