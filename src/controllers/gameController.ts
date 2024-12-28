import { Request, Response } from 'express';
import { addGameToCollection, updateGame } from '../queries/gameQueries';
import { Game } from '../models/Game';


export const createGameController = async (req: Request, res: Response) => {
    const { name, platform, release_year, value, upc, ean, description, image_url, collection_id } = req.body;

    if (!name || !collection_id) {
        return res.status(400).json({ message: 'El nombre del juego y el ID de la colección son obligatorios' });
    }

    try {
        const newGame: Game = {
            name,
            platform,
            release_year,
            value,
            upc,
            ean,
            description,
            image_url,
            collection_id,
        };

        // Llamamos a la consulta para crear el videojuego
        const gameId = await addGameToCollection(newGame);

        res.status(201).json({ message: 'Videojuego añadido exitosamente', gameId });
    } catch (error) {
        console.error('Error al añadir el videojuego:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

//Update a game
export const updateGameController = async (req: Request, res: Response) => {
    const { name, platform, release_year, value, upc, ean, description, image_url, collection_id } = req.body;
    const gameId = parseInt(req.params.id, 10);

    if (!name || !collection_id || isNaN(gameId)) {
        return res.status(400).json({ message: 'El nombre del juego y el ID de la colección son obligatorios' });
    }

    try {
        const updatedGame: Game = {
            name,
            platform,
            release_year,
            value,
            upc,
            ean,
            description,
            image_url,
            collection_id,
        };

        // Llamamos a la consulta para actualizar el videojuego
        const updatedGameId = await updateGame(updatedGame, gameId);

        res.status(200).json({ message: 'Videojuego actualizado exitosamente', updatedGameId });
    } catch (error) {
        console.error('Error al actualizar el videojuego:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
