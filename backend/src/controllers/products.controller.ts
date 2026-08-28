import { Request, Response } from 'express';
import ProductService from '../services/ProductService';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await ProductService.getProducts(req.query);
        res.json(products);
    } catch (error) {
        console.error('getProducts error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}