import jwt from 'jsonwebtoken';

export const generateAuthToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION || '1d',
  });
};

export const generateEmailVerificationToken = (id) => {
    return jwt.sign({ id, type: 'email' }, process.env.JWT_SECRET, {
        expiresIn: '1h', 
    });
};


export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET); 
};