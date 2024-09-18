import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Definir la interfaz para el usuario que estará en el token
interface UserPayload {
    id: number;
    email: string;
}

// Extender la interfaz de Request para incluir el usuario
interface AuthenticatedRequest extends Request {
    user?: UserPayload;
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token is missing or invalid' });
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        // Añadir el usuario verificado al objeto de la solicitud
        req.user = user as UserPayload;
        next();
    });
};
