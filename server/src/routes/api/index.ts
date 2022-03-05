import express from 'express';
const router = express.Router();

import bookingRoutes from './bookings-routes';

router.use('/bookings', bookingRoutes);

export default router;