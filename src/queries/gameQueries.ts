import pool from '../db';
import { Game } from '../models/Game';

export const addGameToCollection = async (game: Game): Promise<number> => {
    const query = `
        INSERT INTO VideoGames (name, platform, release_year, value, upc, ean, description, image_url, collection_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id;
    `;
    const values = [
        game.name,
        game.platform,
        game.release_year,
        game.value,
        game.upc,
        game.ean,
        game.description,
        game.image_url,
        game.collection_id,
    ];

    const result = await pool.query(query, values);
    return result.rows[0].id;
};
