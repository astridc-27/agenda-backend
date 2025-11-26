import * as categoryRepository from '../repositories/categoryRepository.js';

export const getAllCategories = async () => {
  return await categoryRepository.findAllCategories();
};

export const createNewCategory = async (data) => {
  data.name = data.name.trim();
  return await categoryRepository.createCategory(data);
};

export const updateExistingCategory = async (id, data) => {
  return await categoryRepository.updateCategory(id, data);
};

export const deleteCategoryById = async (id) => {
  await categoryRepository.deleteCategory(id);
  return { message: 'Categoría eliminada' };
};