import express, { Request, Response } from 'express';
import apiRoutes from './api';
const router = express.Router();

router.use('/api', apiRoutes);

export default router;