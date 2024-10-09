import connection from '../db';
import { Collection } from '../models/Collection';
import { ResultSetHeader } from 'mysql2/promise';

// Crear una nueva colección
export const createCollection = async (collection: Collection): Promise<number> => {
    const [result] = await connection.promise().query<ResultSetHeader>(
        'INSERT INTO Collections (name, user_id) VALUES (?, ?)', 
        [collection.name, collection.user_id]
    );
    return result.insertId;  // Devolvemos el ID de la colección recién creada
};
