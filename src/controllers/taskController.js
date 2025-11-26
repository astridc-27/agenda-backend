import * as taskService from '../services/taskService.js';

// GET /api/tasks
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getTasksByUser(req.user._id);
    res.json({ tasks }); 
  } catch (error) {
    next(error);
  }
};

// GET /api/tasks/:id
export const getTask = async (req, res, next) => {
  try {
    const task = await taskService.getTaskDetails(req.params.id, req.user._id);
    res.json({ task }); 
  } catch (error) {
    next(error);
  }
};

// POST /api/tasks
export const createTask = async (req, res, next) => {
  try {
    const newTask = await taskService.createNewTask(req.body, req.user._id);
    res.status(201).json({ task: newTask });
  } catch (error) {
    next(error);
  }
};

// PUT /api/tasks/:id
export const updateTask = async (req, res, next) => {
  try {
    const updatedTask = await taskService.updateExistingTask(req.params.id, req.user._id, req.body);
    res.json({ task: updatedTask });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/tasks/:id
export const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTaskById(req.params.id, req.user._id);
    
    res.status(204).end(); 
  } catch (error) {
    next(error);
  }
};