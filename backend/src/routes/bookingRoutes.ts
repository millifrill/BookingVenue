import express from 'express';
import {
  getBookingById,
  createBooking,
  deleteBooking,
} from '../controllers/bookingController.ts';

const router = express.Router();

router.get('/booking/:id', getBookingById);
router.post('/booking', createBooking);
router.delete('/booking/:id', deleteBooking);

export default router;
