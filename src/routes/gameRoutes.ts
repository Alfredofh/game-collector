import { Router } from 'express';
import { createGameController } from '../controllers/gameController';
import { authenticateJWT } from '../middleware/authenticateJWT';

const router = Router();

// Ruta para añadir un videojuego a una colección
router.post('/api/videogames/add', authenticateJWT, createGameController);

export default router;
