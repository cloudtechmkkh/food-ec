import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { db } from '../utils/db';
import { Request, Response } from 'express';

const privateKey = fs.readFileSync('../keys/private.key');

export const registerAdmin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    await db.query(
        `
        INSERT INTO admins (email, password_hash, role)
        VALUES (?, ?, 'admin')
        `,
        [email, hash]
    );

    res.json({ message: 'Admin registered' })
}

export const loginAdmin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const [rows]: any[] = await db.query(
        `
        SELECT * FROM admins WHERE email = ?
        `,
        [email]
    );

    const admin = rows[0];
    if (!admin) return res.status(401).json({ message: 'User not found' })

    const ok = await bcrypt.compare(password, admin.password_hash);
    if (!ok) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign(
        {
            id: admin.id,
            email: admin.email,
            role: admin.role // ★ Nuxt側で使う
        },
        privateKey,
        {
            algorithm: 'RS256',
            expiresIn: '7d'
        }
    );

    res.json({ token });
}