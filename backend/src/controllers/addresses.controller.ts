import { Request, Response } from 'express';
import AddressService from '../services/AddressService';

export const getAddresses = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user?.id;
        const addresses = await AddressService.getAddresses(userId);
        res.json(addresses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};