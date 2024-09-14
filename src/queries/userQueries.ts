import connection from '../db';
import { User } from '../models/User';

// Verificar si el usuario ya existe
export const findUserByEmail = async (email: string): Promise<User[]> => {
    const [rows] = await connection.promise().query('SELECT * FROM Users WHERE email = ?', [email]);
    return rows as User[];
};

// Crear un nuevo usuario
export const createUser = async (user: User): Promise<number> => {
    const [result] = await connection.promise().query(
        'INSERT INTO Users (name, email, password_hash) VALUES (?, ?, ?)',
        [user.name, user.email, user.password_hash]
    );
    return (result as { insertId: number }).insertId;
};
