import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
import { Server } from 'http';

let server: Server;
async function main() {
  try {
    await mongoose.connect(`${config.database_url}`);
    server = app.listen(config.port, () => {
      console.log(`Assignment 4 is listening on port ${config.port}`);
    });
  } catch (e) {
    console.log(e);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log('unahandledRejection is detected , shutting down ...');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log('uncaughtException is detected , shutting down ...');
  process.exit(1);
});
