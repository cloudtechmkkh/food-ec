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

export const getAdminProducts = async (req: Request, res: Response) => {
    try {
        const products = await AdminService.getProducts();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

export const updateAdminProduct = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const updated = await AdminService.updateProduct(id, req.body);
        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Update failed' });
    }
}

export const createAdminProduct = async (req: Request, res: Response) => {
    try {
        const created = await AdminService.createProduct(req.body);
        res.json(created);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Create failed' });
    }
}

export const getProductLots = async (req: Request, res: Response) => {
    try {
        const productId = Number(req.params.id);
        const lots = await AdminService.getProductLots(productId);
        res.json(lots);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

export const createLot = async (req: Request, res: Response) => {
    try {
        const productId = Number(req.params.id);
        const lot = await AdminService.createLot(productId, req.body);
        res.json(lot);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Create lot failed' });
    };
}

export const updateLot = async (req: Request, res: Response) => {
    try {
        const lotId = Number(req.params.lotId);
        const updated = await AdminService.updateLot(lotId, req.body);
        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Update lot failed' });
    };
}