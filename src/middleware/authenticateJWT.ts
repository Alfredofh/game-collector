import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';

export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Falta el encabezado de autorización' });
    }

    if (!authHeader.startsWith('Bearer ')) {
        return res.status(400).json({ message: 'Formato del encabezado de autorización inválido. Use Bearer <token>' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) {
            console.error('Error al verificar el token:', err.message);
            return res.status(403).json({ message: 'Token inválido o expirado' });
        }

        req.user = user as { id: number; email: string };
        next();
    });
};
