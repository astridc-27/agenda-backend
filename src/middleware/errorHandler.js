export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode === 200 ? 500 : err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Error interno del servidor',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};