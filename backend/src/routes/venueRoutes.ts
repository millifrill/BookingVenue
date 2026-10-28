import express from 'express';
import {
   getVenues,
   getVenueById,
   createVenue,
   updateVenue,
   deleteVenue,
} from '../controllers/venueController.js';

const router = express.Router();

router.get('/venues', getVenues);
router.get('/venue/:id', getVenueById);
router.post('/venue', createVenue);
router.put('/venue/:id', updateVenue);
router.delete('/venue/:id', deleteVenue);

export default router;
