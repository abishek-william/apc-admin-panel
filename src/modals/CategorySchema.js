// models/Category.js

import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Category name must be at least 3 characters long'],
  },
}, {
  timestamps: true,
});

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

export default Category;
