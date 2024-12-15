import connection from '../db';
import { Collection } from '../models/Collection';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

// Crear una nueva colección
export const createCollection = async (collection: Collection): Promise<number> => {
    const [result] = await connection.promise().query<ResultSetHeader>(
        'INSERT INTO Collections (name, user_id) VALUES (?, ?)',
        [collection.name, collection.user_id]
    );
    return result.insertId;  // Devolvemos el ID de la colección recién creada
};

//Obtener todas las colecciones de un usuario

export const getCollectionByUser = async (userId: number): Promise<Collection[]> => { // Promise<Collection[]>: Indica que la función es asíncrona y devuelve una promesa que, cuando se resuelve, contiene un array de objetos del tipo Collection
    const [rows] = await connection.promise().query<Collection[] & RowDataPacket[]>(
        'SELECT * FROM Collections WHERE user_id = ?', [userId]
    );
    return rows;
};
