import express from 'express';
import * as categoryController from '../controllers/categoryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateCategory } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, categoryController.getCategories)
  .post(protect, validateCategory, categoryController.createCategory);

router.route('/:id')
  .put(protect, validateCategory, categoryController.updateCategory)
  .delete(protect, categoryController.deleteCategory);

export default router;