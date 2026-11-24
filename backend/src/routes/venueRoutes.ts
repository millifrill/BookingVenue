import express from 'express';
import {
  getVenues,
  getVenueById,
  createVenue,
  updateVenue,
  deleteVenue,
} from '../controllers/venueController.ts';
import { authenticateToken } from '../middleware/authMiddleware.ts';

const router = express.Router();

router.get('/venues', getVenues);
router.get('/venue/:id', getVenueById);
router.post('/venue', authenticateToken, createVenue);
router.put('/venue/:id', authenticateToken, updateVenue);
router.delete('/venue/:id', authenticateToken, deleteVenue);

export default router;
