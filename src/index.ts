import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './db'; 
import { setupSwagger } from './swagger/swaggerConfig';

dotenv.config(); // Cargar variables del archivo .env

const app: Application = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

setupSwagger(app);


app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
