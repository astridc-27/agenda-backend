import * as taskRepository from '../repositories/taskRepository.js';

export const getTasksByUser = async (userId) => {
  return await taskRepository.findAllTasksByUserId(userId);
};

export const getTaskDetails = async (taskId, userId) => {
  const task = await taskRepository.findTaskById(taskId, userId);
  if (!task) {
    const error = new Error('Tarea no encontrada o no pertenece al usuario');
    error.statusCode = 404;
    throw error;
  }
  return task;
};

export const createNewTask = async (data, userId) => {
  const taskData = { ...data, user: userId };
  return await taskRepository.createTask(taskData);
};

export const updateExistingTask = async (taskId, userId, data) => {
  const updatedTask = await taskRepository.updateTask(taskId, userId, data);
  if (!updatedTask) {
    const error = new Error('Tarea no encontrada o no pertenece al usuario');
    error.statusCode = 404;
    throw error;
  }
  return updatedTask;
};

export const deleteTaskById = async (taskId, userId) => {
  const deletedTask = await taskRepository.deleteTask(taskId, userId);
  if (!deletedTask) {
    const error = new Error('Tarea no encontrada o no pertenece al usuario');
    error.statusCode = 404;
    throw error;
  }
  return { message: 'Tarea eliminada' };
};