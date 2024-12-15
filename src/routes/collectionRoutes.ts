// src/routes/collectionRoutes.ts
import { Router } from 'express';
import { createCollectionController, getCollectionsController, getCollectionByIdController } from '../controllers/collectioncontroller';
import { authenticateJWT } from '../middleware/authenticateJWT';
const router = Router();

// Ruta para crear una nueva colección
router.post('/api/collection', authenticateJWT, createCollectionController);
router.get('/api/collection', authenticateJWT, getCollectionsController);
router.get('/api/collection/:id', authenticateJWT, getCollectionByIdController)

export default router;
