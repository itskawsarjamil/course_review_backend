import express from 'express';
import { validateRequest } from '../../../middleware/validateRequest';
import { CategoryValidation } from './category.validation';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(CategoryValidation.CreateCategoryValidationSchema),
  CategoryController.CreateCategory,
);

router.get('/', CategoryController.GetAllCategory);

export const CategoryRoutes = router;
