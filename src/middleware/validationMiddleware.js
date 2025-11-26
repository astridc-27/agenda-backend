import Joi from 'joi';

// Esquema de validación para Usuario
const authSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Esquema de validación para Tarea (CRUD)
const taskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).allow('').optional(),
  dueDate: Joi.date().min('now').optional(),
  isCompleted: Joi.boolean().optional(),
  priority: Joi.string().valid('Low', 'Medium', 'High').optional(),
  category: Joi.string().allow(null, '').optional(), // Puede ser null
});

// Esquema de validación para Categoría (CRUD)
const categorySchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  description: Joi.string().max(200).allow('').optional(),
});


// Función genérica para validar
const validate = (schema, source = 'body') => (req, res, next) => {
  const { error } = schema.validate(req[source]);
  if (error) {
    const message = error.details.map(i => i.message).join(', ');
    const validationError = new Error(message);
    validationError.statusCode = 400;
    return next(validationError);
  }
  next();
};

// Middlewares exportables
export const validateRegister = validate(authSchema);
export const validateLogin = validate(authSchema.keys({
    name: Joi.string().optional() 
}), 'body');
export const validateTask = validate(taskSchema);
export const validateCategory = validate(categorySchema);