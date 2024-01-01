import { Schema, model } from 'mongoose';
import { TCategory } from './category.interface';

const CategorySchema = new Schema<TCategory>({
  name: {
    type: String,
    unique: true,
    required: [true, 'Category Name is Required'],
  },
});

export const Category = model<TCategory>('category', CategorySchema);
