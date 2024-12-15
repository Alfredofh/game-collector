// src/routes/collectionRoutes.ts
import { Router } from 'express';
import { createCollectionController } from '../controllers/collectioncontroller';
import { authenticateJWT } from '../middleware/authenticateJWT';
const router = Router();

// Ruta para crear una nueva colección
router.post('/api/collection', authenticateJWT, createCollectionController);

export default router;
