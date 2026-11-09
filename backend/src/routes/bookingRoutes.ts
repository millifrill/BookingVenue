import express from 'express';
import { deleteBooking } from '../controllers/bookingController.ts';

const router = express.Router();

router.delete('/booking/:id', deleteBooking);

export default router;
