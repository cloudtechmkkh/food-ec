import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { RowDataPacket } from 'mysql2';
import { db } from '../utils/db'

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer', '');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const [rows] = await db.query<RowDataPacket[]>(
        `
        SELECT public_key FROM systems 
        `,
    )

    const publicKey = rows[0].public_key;
    
    try {
        const decoded: any = jwt.verify(
            token, 
            publicKey,
            {
                algorithms: ['RS256']
            }
        );

        (req as any).user = { id: decoded.id };
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}