import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import "./db"; 
import userRoutes from './routes/userRoutes'; 
import collectionRoutes from './routes/collectionRoutes'; 

import { errorHandler } from './middleware/errorHandler';
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Usar las rutas de usuario
app.use(userRoutes);
app.use(collectionRoutes); 
// Middleware para el manejo de errores
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
