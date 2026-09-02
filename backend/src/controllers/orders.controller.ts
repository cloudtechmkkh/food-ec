import { Request, Response } from 'express';
import OrderService from '../services/OrderService';

export const createOrder = async (req: Request, res: Response) => {
    try {
        const order = await OrderService.createOrder(req.body, (req as any).user?.id);

        res.json(order);
    } catch (err: any) {
        console.error(err);
        res.status(400).json({ message: err.message || 'Order failed' });
    }
};