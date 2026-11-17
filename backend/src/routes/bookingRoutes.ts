import express from 'express';
import {
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} from '../controllers/bookingController.ts';

const router = express.Router();

router.get('/booking/:id', getBookingById);
router.post('/booking', createBooking);
router.put('/booking/:id', updateBooking);
router.delete('/booking/:id', deleteBooking);

export default router;
