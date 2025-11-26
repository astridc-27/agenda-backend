import { Task } from '../models/Task.js';

export const findAllTasksByUserId = async (userId) => {
  // Populate para traer la información de la categoría relacionada
  return await Task.find({ user: userId }).populate('category', 'name');
};

export const findTaskById = async (taskId, userId) => {
  return await Task.findOne({ _id: taskId, user: userId }).populate('category', 'name');
};

export const createTask = async (taskData) => {
  const task = new Task(taskData);
  return await task.save();
};

export const updateTask = async (taskId, userId, updateData) => {
  return await Task.findOneAndUpdate(
    { _id: taskId, user: userId },
    updateData,
    { new: true }
  );
};

export const deleteTask = async (taskId, userId) => {
  const deletedTask = await Task.findOneAndDelete({ 
    _id: taskId, 
    user: userId 
  });
  
  return deletedTask; 
};