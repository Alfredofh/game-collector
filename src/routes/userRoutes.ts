import { Router } from 'express';
import { registerUser } from '../controllers/userController';
import { validateUser } from '../middleware/validateUser';

const router = Router();

// Ruta para registrar un nuevo usuario
router.post('/api/users', validateUser, registerUser);

export default router;
