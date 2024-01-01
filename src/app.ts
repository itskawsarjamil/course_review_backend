import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './middleware/globalErrorHandler';
import routeNotFound from './middleware/routeNotFound';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send(`WELCOME TO PART 3 OF Next LEVEL`);
});

app.use('/api', router);
app.use(globalErrorHandler);
app.use('*', routeNotFound);
export default app;
