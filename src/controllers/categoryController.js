import * as categoryService from '../services/categoryService.js';

export const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json({ categories });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const newCategory = await categoryService.createNewCategory(req.body);
    res.status(201).json({ category: newCategory });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const updatedCategory = await categoryService.updateExistingCategory(req.params.id, req.body);
    res.json({ category: updatedCategory });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const result = await categoryService.deleteCategoryById(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};