import { Request, Response } from 'express';
import AdminService from '../services/AdminService';

export const getAdminOrders = async (req: Request, res: Response) => {
    try {
        const orders = await AdminService.getOrders();
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

export const getAdminOrderDetail = async (req: Request, res: Response) => {
    try {
        const orderId = Number(req.params.id);
        const order = await AdminService.getOrderDetail(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}