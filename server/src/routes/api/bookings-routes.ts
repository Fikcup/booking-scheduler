import express from 'express';
const router = express.Router();

import bookingController from '../../controllers/booking-controller';

router.get('/', bookingController.getBookings);

router.post('/', bookingController.createBooking);

export default router;