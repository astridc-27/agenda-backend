import dotenv from 'dotenv';
dotenv.config();
console.log('EMAIL_SERVICE_HOST cargado:', process.env.EMAIL_SERVICE_HOST);

import express from 'express';
import cors from 'cors';
import { connectDB } from './src/config/db.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import authRoutes from './src/routes/authRoutes.js';
import taskRoutes from './src/routes/taskRoutes.js';
import categoryRoutes from './src/routes/categoryRoutes.js';



const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://agenda-frontend-alpha.vercel.app',
  credentials: true
}));
app.use(express.json());


app.get('/', (req, res) => {
  res.send('API Agenda de Tareas | Status: OK');
});
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/categories', categoryRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto ${PORT}`);
  console.log("BACKEND_URL ES:", process.env.BACKEND_URL);
});

