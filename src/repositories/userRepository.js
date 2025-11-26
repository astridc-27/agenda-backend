import User from '../models/User.js';


export const createUser = async (userData) => {
    try {
        if (typeof userData !== 'object' || userData === null || Array.isArray(userData)) {
            console.error('Error: El argumento de userData no es un objeto:', userData);
            throw new TypeError('El argumento para la creación del usuario debe ser un objeto.');
        }

        const user = new User(userData); 
        await user.save(); 
        return user;
    } catch (error) {
        console.error('Error al crear usuario en el repositorio:', error);
        throw error;
    }
};


export const findUserByEmail = async (email, includePassword = false) => {
    let query = User.findOne({ email }); 
    if (includePassword) {
        query = query.select('+password');
    }
    return await query.exec();
};


export const findUserById = async (userId) => {
    return await User.findById(userId);
};


export const updateUser = async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, { 
        new: true, 
        runValidators: true,
    });
};


export const deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};


export const findUserByVerificationToken = async (token) => {
    return await User.findOne({ verificationToken: token });
};