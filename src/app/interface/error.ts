export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessage: string;
  stack: string | undefined;
};
