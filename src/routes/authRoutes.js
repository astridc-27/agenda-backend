import express from 'express';
import * as authController from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRegister, validateLogin } from '../middleware/validationMiddleware.js';

const router = express.Router();


router.post('/register', validateRegister, authController.register);

router.post('/login', validateLogin, authController.login);

router.get('/verify-email', authController.verifyEmailController);

router.get('/profile', protect, authController.getProfile);

export default router;