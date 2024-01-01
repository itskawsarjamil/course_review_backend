/* eslint-disable @typescript-eslint/no-explicit-any */
import { TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  const errorMessage = `${extractedMessage} is already exists`;

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID',
    errorMessage,
    stack: err?.stack,
  };
};

export default handleDuplicateError;
