import pool from '../db';
import { Collection } from '../models/Collection';

// Crear una nueva colección
export const createCollection = async (collection: Collection): Promise<number> => {
    const query = `
        INSERT INTO Collections (name, user_id)
        VALUES ($1, $2)
        RETURNING id;
    `;
    const values = [collection.name, collection.user_id];
    const result = await pool.query(query, values);
    return result.rows[0].id;
};

// Obtener todas las colecciones de un usuario
export const getCollectionByUser = async (userId: number): Promise<Collection[]> => {
    const query = `
        SELECT * FROM Collections
        WHERE user_id = $1;
    `;
    const values = [userId];
    const result = await pool.query(query, values);
    return result.rows;
};

// Obtener una colección específica con sus videojuegos
export const getCollectionById = async (collectionId: number, userId: number): Promise<Collection | null> => {
    const query = `
        SELECT 
            c.*,
            json_agg(
                json_build_object(
                    'id', v.id,
                    'name', v.name,
                    'platform', v.platform,
                    'release_year', v.release_year,
                    'value', v.value,
                    'upc', v.upc,
                    'ean', v.ean,
                    'description', v.description,
                    'image_url', v.image_url
                )
            ) AS video_games
        FROM Collections c
        LEFT JOIN VideoGames v ON c.id = v.collection_id
        WHERE c.id = $1 AND c.user_id = $2
        GROUP BY c.id;
    `;
    const values = [collectionId, userId];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
};


// Actualizar una colección
export const updateCollection = async (collectionId: number, userId: number, name: string): Promise<number> => {
    const query = `
        UPDATE Collections
        SET name = $1
        WHERE id = $2 AND user_id = $3;
    `;
    const values = [name, collectionId, userId];
    const result = await pool.query(query, values);
    return result.rowCount;
};

// Eliminar una colección
export const deleteCollection = async (collectionId: number, userId: number): Promise<boolean> => {
    const query = `
        DELETE FROM Collections
        WHERE id = $1 AND user_id = $2;
    `;
    const values = [collectionId, userId];
    const result = await pool.query(query, values);
    return result.rowCount > 0;
};
