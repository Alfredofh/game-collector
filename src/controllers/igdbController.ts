import { Request, Response } from "express";

import { searchGamesIGDB } from "../queries/igdbQueries";

export const searchGamesController = async (req: Request, res: Response) => {
    const { query } = req.query;

    if (!query || typeof query !== 'string') {
        return res.status(400).json({ message: 'El parámetro "query" es requerido y debe ser un string.' });
    }

    try {
        const resultados = await searchGamesIGDB(query);
        res.json(resultados);
    } catch (error) {
        console.error('Error al buscar juegos en IGDB:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};