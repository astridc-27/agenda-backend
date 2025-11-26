// taskRoutes.js (Corregido)

import express from 'express';
// Asegúrate de que taskController.js usa "export const deleteTask = ..."
import * as taskController from '../controllers/taskController.js'; 
import { protect } from '../middleware/authMiddleware.js';
import { validateTask } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, taskController.getTasks)
  .post(protect, validateTask, taskController.createTask);

router.route('/:id')
  .get(protect, taskController.getTask)
  .put(protect, validateTask, taskController.updateTask) 
  .delete(protect, taskController.deleteTask); 

export default router;