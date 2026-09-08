import { Router } from 'express';
import { getAdminOrders, getAdminOrderDetail, getAdminProducts, updateAdminProduct } from '../controllers/admin.controller';
import adminAuth from '../middlewares/adminAuth';

const router = Router();

router.get('/orders', adminAuth, getAdminOrders);
router.get('/orders/:id', adminAuth, getAdminOrderDetail);
router.get('/products', adminAuth, getAdminProducts);
router.put('/products/:id', adminAuth, updateAdminProduct);

export default router;