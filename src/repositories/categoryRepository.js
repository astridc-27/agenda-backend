import { Category } from '../models/Category.js';

export const findAllCategories = async () => {
  return await Category.find({});
};

export const findCategoryById = async (id) => {
  return await Category.findById(id);
};

export const createCategory = async (categoryData) => {
  const category = new Category(categoryData);
  return await category.save();
};

export const updateCategory = async (id, updateData) => {
  return await Category.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteCategory = async (id) => {
  await Category.findByIdAndDelete(id);
};