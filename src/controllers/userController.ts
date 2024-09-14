import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { findUserByEmail, createUser } from '../queries/userQueries';
import { User } from '../models/User';

export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    // Validar datos del usuario
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Verificar si el usuario ya existe
        const existingUser = await findUserByEmail(email);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        const newUser: User = {
            name: username,
            email,
            password_hash: hashedPassword,
        };

        // Insertar nuevo usuario en la base de datos
        const userId = await createUser(newUser);

        // Enviar respuesta
        res.status(201).json({ message: 'Usuario registrado exitosamente', userId });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
