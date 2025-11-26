import * as userRepository from '../repositories/userRepository.js';
import * as taskRepository from '../repositories/taskRepository.js'; // Importación para el JWT
import * as jwtUtil from '../utils/jwtUtils.js'; // Función para generar JWT
import { sendVerificationEmail } from '../utils/email.js'; // Función de envío de email
import AppError from '../utils/AppError.js';
import * as crypto from 'crypto';


export const registerUser = async (userData) => {
    const existingUser = await userRepository.findUserByEmail(userData.email);
    if (existingUser) {
        throw new Error('El email ya está registrado.');
    }

    const user = await userRepository.createUser(userData);
    
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpiry = new Date(Date.now() + 3600000); 

    user.verificationToken = verificationToken;
    user.verificationTokenExpiry = verificationTokenExpiry;
    await user.save(); 

    sendVerificationEmail(user, verificationToken)
        .catch(error => {
            console.error('Error al enviar email de verificación:', error);
        });
    
    const userObject = user.toObject();
    delete userObject.password; 
    
    return { 
        user: userObject, 
        message: 'Registro exitoso. Se ha enviado un correo de verificación.' 
    };
};


export const loginUser = async (email, password) => {

    const user = await userRepository.findUserByEmail(email, true);

    if (!user) {
        throw new AppError('Credenciales inválidas.', 401);
    }

    if (!user.isVerified) {
        throw new AppError('Por favor, verifica tu correo electrónico antes de iniciar sesión.', 403);
    }

    const isMatch = await user.comparePassword(password); 

    if (!isMatch) {
        throw new AppError('Credenciales inválidas.', 401);
    }

    const token = jwtUtil.generateAuthToken(user._id);

    return { 
        token, 
        userId: user._id, 
        name: user.name,
        email: user.email
    };
};


export const verifyEmail = async (token) => {
    const user = await userRepository.findUserByVerificationToken(token);
    
    if (!user) {
        throw new AppError('Token de verificación inválido o no encontrado.', 404);
    }
    
    if (user.verificationTokenExpiry < Date.now()) {
        throw new AppError('Token de verificación expirado.', 400);
    }

    if (user.isVerified) {
        throw new AppError('Esta cuenta ya ha sido verificada.', 400);
    }

    user.isVerified = true;
    user.verificationToken = undefined; 
    user.verificationTokenExpiry = undefined;
    
    await user.save(); 

    return user;
};


export const getProfile = async (userId) => {
    const user = await userRepository.findUserById(userId);
    
    if (!user) {
        throw new AppError('Usuario no encontrado.', 404);
    }
    
    return user;
};
