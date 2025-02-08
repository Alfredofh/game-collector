import pool from '../db';
import { Game } from '../models/Game';

export const addGameToCollection = async (game: Game): Promise<number> => {
    const query = `
        INSERT INTO VideoGames (name, platform, release_year, value, upc, ean, description, image_url, collection_id)
        VALUES ($1, $2::jsonb, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id;
    `;
    const values = [
        game.name,
        JSON.stringify(game.platform),
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

//Update a game
export const updateGame = async (game: Game, gameId: number): Promise<number> => {
    const query = `
        UPDATE VideoGames
        SET name = $1,
            platform = $2,
            release_year = $3,
            value = $4,
            upc = $5,
            ean = $6,
            description = $7,
            image_url = $8,
            collection_id = $9
        WHERE id = $10
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
        gameId,
    ];

    const result = await pool.query(query, values);
    return result.rows[0].id;
};

//Delete a game

export const deleteGame = async (gameId: number, userId: number): Promise<boolean> => {
    const query = `
        DELETE FROM VideoGames
        WHERE id = $1
        AND collection_id IN (
            SELECT id FROM Collections WHERE user_id = $2
        )
            RETURNING id;
    `;
    const values = [gameId, userId];
    const result = await pool.query(query, values);
    return result.rowCount > 0;
};