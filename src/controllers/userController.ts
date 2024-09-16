import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { findUserByEmail, createUser } from '../queries/userQueries';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';

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

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Validar datos del usuario
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Verificar si el usuario existe
        const user = await findUserByEmail(email);
        if (user.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Verificar la contraseña
        const validPassword = await bcrypt.compare(password, user[0].password_hash);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generar JWT
        const token = jwt.sign(
            { id: user[0].id, email: user[0].email },
            process.env.JWT_SECRET as string, // Asegúrate de tener JWT_SECRET en tu .env
            { expiresIn: '1h' }
        );

        // Enviar respuesta
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};