import express from 'express';
import { userController } from './user.controller';

export const UserRoutes = express.Router();

UserRoutes.get('/', userController.getAllUser);
