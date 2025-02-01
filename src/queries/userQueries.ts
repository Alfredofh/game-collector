import pool from '../db';
import { User } from '../models/User';

// Verificar si el usuario ya existe
export const findUserByEmail = async (email: string): Promise<User[]> => {
    const query = `
        SELECT * FROM Users
        WHERE email = $1;
    `;
    const values = [email];
    const result = await pool.query(query, values);
    return result.rows;
};

// Crear un nuevo usuario
export const createUser = async (user: User): Promise<number> => {
    const query = `
        INSERT INTO Users (name, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING id;
    `;
    const values = [user.name, user.email, user.password_hash];
    const result = await pool.query(query, values);
    return result.rows[0].id;
};

