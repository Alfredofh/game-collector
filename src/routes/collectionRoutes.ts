// src/routes/collectionRoutes.ts
import { Router } from 'express';
import { createCollectionController } from '../controllers/collectioncontroller';

const router = Router();

// Ruta para crear una nueva colección
router.post('/api/colecciones', createCollectionController);

export default router;
