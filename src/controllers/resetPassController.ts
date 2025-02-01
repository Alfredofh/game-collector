import { Request, Response } from 'express';
import crypto from 'crypto';

// Mock de búsqueda de usuario
const findUserByEmail = async (email: string) => {
    console.log(`🔹 Mock: buscando usuario con email: ${email}`);
    if (email === 'test@example.com') {
        return { id: 1, email: 'test@example.com' }; // Simula un usuario encontrado
    }
    return null; // Simula que el usuario no existe
};

// Mock de guardar token (sin base de datos)
const saveResetToken = async (userId: number, token: string) => {
    console.log(`🔹 Mock: Guardando token ${token} para usuario ${userId}`);
};

// Mock de envío de email
const sendEmail = async (to: string, subject: string, text: string) => {
    console.log(`📧 Mock: Enviando email a ${to} - Asunto: ${subject}\nContenido: ${text}`);
};

export const requestPasswordResetController = async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'El email es obligatorio' });
    }

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(200).json({ message: 'Si el email existe, se enviará un enlace de recuperación' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

        await saveResetToken(user.id, resetToken);
        await sendEmail(email, 'Recuperación de contraseña', `Haz clic aquí para restablecer tu contraseña: ${resetLink}`);

        res.status(200).json({ message: 'Si el email existe, se enviará un enlace de recuperación' });
    } catch (error) {
        console.error('Error en la recuperación de contraseña:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
