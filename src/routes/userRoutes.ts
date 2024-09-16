import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/userController';
import { validateUser } from '../middleware/validateUser';

const router = Router();

// Ruta para registrar un nuevo usuario
router.post('/api/users', validateUser, registerUser);

//Ruta para iniciar sesión
router.post('/api/login', loginUser);

export default router;
