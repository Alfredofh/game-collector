import { Router } from 'express';
import { searchGamesController } from '../controllers/igdbController';

const router = Router();

router.get('/api/igdb/search', searchGamesController);

export default router;
