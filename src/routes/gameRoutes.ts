import { Router } from 'express';
import { createGameController, updateGameController } from '../controllers/gameController';
import { authenticateJWT } from '../middleware/authenticateJWT';

const router = Router();

// Ruta para añadir un videojuego a una colección
router.post('/api/videogames/add', authenticateJWT, createGameController);
router.put('/api/videogames/update/:id', authenticateJWT, updateGameController);
export default router;
