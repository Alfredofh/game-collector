import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/userController';
import { validateUser } from '../middleware/validateUser';
import { requestPasswordResetController } from '../controllers/resetPassController';
const router = Router();

// Ruta para registrar un nuevo usuario
router.post('/api/users', validateUser, registerUser);

//Ruta para iniciar sesión
router.post('/api/login', loginUser);

// Ruta para solicitar recuperación de contraseña
router.post('/api/password-reset', requestPasswordResetController);
export default router;
