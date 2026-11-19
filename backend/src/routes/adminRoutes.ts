import express from 'express';
import { adminLogin } from '../controllers/adminController.ts';

const router = express.Router();

router.post('/admin/login', adminLogin);

export default router;
