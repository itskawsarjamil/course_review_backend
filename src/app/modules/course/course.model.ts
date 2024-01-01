import { Schema, model } from 'mongoose';
import { TCourse, TDetails, TTags } from './course.interface';

const detailsSchema = new Schema<TDetails>({
  level: {
    type: String,
    required: [true, 'Level is required'],
    enum: ['Beginner', 'Intermediate', 'Advanced'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
});

const tagsSchema = new Schema<TTags>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      unique: true,
    },
    instructor: {
      type: String,
      required: [true, 'Instructor is required'],
      trim: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'category',
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price should be non-negative'],
    },
    tags: [tagsSchema],
    startDate: {
      type: String,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: String,
      required: [true, 'End date is required'],
    },
    language: {
      type: String,
      required: [true, 'Language is required'],
    },
    provider: {
      type: String,
      required: [true, 'Provider is required'],
      trim: true,
    },
    durationInWeeks: {
      type: Number,
      required: [true, 'Duration in weeks is required'],
    },
    details: {
      type: detailsSchema,
      required: [true, 'Details is required'],
    },
  },
  { timestamps: true },
);

export const Course = model<TCourse>('course', courseSchema);
