import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 

export const protect = async (req, res, next) => {
  let token;


  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password -verificationToken'); 

      if (!req.user || !req.user.isVerified) { 
        res.status(401);
        throw new Error('Cuenta no encontrada o no verificada. Por favor, revisa tu correo electrónico.');
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Token no autorizado o expirado');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('No hay token, acceso denegado');
  }
};