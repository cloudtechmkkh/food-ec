import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../utils/db';
import { RowDataPacket } from 'mysql2';

export default async function adminAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer', '');

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const [rows] = await db.query<RowDataPacket[]>(
        `
        SELECT public_key
        FROM systems
        `
    )
    const publicKey = rows[0].public_key;

    try {
        const decoded = jwt.verify(
                token,
                publicKey,
                { algorithms: ['RS256'] }
        )
        if(!decoded) throw new Error();
        req.admin = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid admin token' });
    } 
}