import connection from '../db';
import { User } from '../models/User';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

// Verificar si el usuario ya existe
export const findUserByEmail = async (email: string): Promise<User[]> => {
    const [rows] = await connection.promise().query<User[] & RowDataPacket[]>(
        'SELECT * FROM Users WHERE email = ?', 
        [email]
    );
    return rows; 
};

// Crear un nuevo usuario
export const createUser = async (user: User): Promise<number> => {
    const [result] = await connection.promise().query<ResultSetHeader>(
        'INSERT INTO Users (name, email, password_hash) VALUES (?, ?, ?)',
        [user.name, user.email, user.password_hash]
    );
    return result.insertId;
};