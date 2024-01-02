import express, { Request, Response } from 'express';
import { CourseRoutes, RoutesOfCourses } from '../modules/course/course.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { ReviewRoutes } from '../modules/review/review.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { UserRoutes } from '../modules/user/user.routes';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send(
    `Hello ,Here is nothing for you.
     you came here by using this way  ${req.originalUrl} using ${req.method} method`,
  );
});
const allRouter = [
  {
    path: '/course',
    route: CourseRoutes,
  },
  {
    path: '/courses',
    route: RoutesOfCourses,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
];

allRouter.forEach((route) => router.use(route.path, route.route));

export default router;
