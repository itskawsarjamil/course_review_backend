declare namespace NodeJS {
  export type ProcessEnv = {
    PORT: number;
    DATABASE_URL_LOCAL: string;
    DATABASE_URL: string;
    NODE_ENV: string;
    BCRYPT_SALT_ROUND: number;
    JWT_ACCESS_EXPIRES_IN: string;
    JWT_ACCESS_SECRET: string;
  };
}
