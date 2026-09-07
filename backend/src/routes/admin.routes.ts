import { Router } from 'express';
import { getAdminOrders, getAdminOrderDetail } from '../controllers/admin.controller';
import adminAuth from '../middlewares/adminAuth';

const router = Router();

router.get('/orders', adminAuth, getAdminOrders);
router.get('/orders/:id', adminAuth, getAdminOrderDetail);

export default router;