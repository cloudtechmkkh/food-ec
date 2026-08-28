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

export const getProductDetail = async (req: Request, res: Response) => {
    try {
        const product = await ProductService.getProductDetail(Number(req.params.id));

        if(!product) {
            return res.status(404).json({ message: 'Product not found'})
        }

        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}