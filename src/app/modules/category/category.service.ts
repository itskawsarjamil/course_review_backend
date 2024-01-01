import { TCategory } from './category.interface';
import { Category } from './category.model';

const createCategoryIntoDB = async (payload: TCategory) => {
  const result1 = await Category.create(payload);
  const result = await Category.findOne({ _id: result1._id }).select('-__v');
  return result;
};

const getAllCategoryFromDB = async () => {
  const result = await Category.find().select('-__v');
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
};
