import express from 'express';
import { getCities } from '../controllers/cityController.ts';

const router = express.Router();

router.get('/cities', getCities);

export default router;
