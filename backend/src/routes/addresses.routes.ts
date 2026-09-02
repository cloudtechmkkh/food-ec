import { Router } from 'express';
import { getAddresses } from '../controllers/addresses.controller';
import authMiddleware from '../middlewares/auth';

const router = Router();

// 認証必須 （ユーザーの住所なので）
router.get('/', authMiddleware, getAddresses);

export default router;