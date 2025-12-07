import * as authService from '../services/authService.js';

export const register = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body); 
    
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const verifyEmailController = async (req, res, next) => {
    try {
        const { token } = req.query;
        if (!token) {
            res.status(400);
            throw new Error('Token de verificación es requerido');
        }
        
        await authService.verifyEmail(token);
        
        const redirectUrl = `${process.env.FRONTEND_URL}/login?verified=true`; 
        
        res.redirect(302, redirectUrl); 

    } catch (error) {

      // AÑADE ESTAS LÍNEAS PARA DEBUG:
        console.error('VERIFICACIÓN DE EMAIL FALLIDA:', error); 
        console.error('MENSAJE DEL ERROR:', error.message);
        
        const errorMessage = encodeURIComponent(error.message);
        const errorRedirectUrl = `${process.env.FRONTEND_URL}/login?error=true&message=${errorMessage}`;
        res.redirect(302, errorRedirectUrl);
    }
};

export const getProfile = async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
};