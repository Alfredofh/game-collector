import { Request, Response } from 'express';
import { createCollection, getCollectionByUser } from '../queries/collectionQueries';
import { Collection } from '../models/Collection';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';

export const createCollectionController = async (req: AuthenticatedRequest, res: Response) => {
    const { name } = req.body;
    const userId = req.user?.id;
    if (!name || !userId) {
        return res.status(400).json({ message: 'Nombre y ID de usuario son obligatorios' });
    }
    try {
        const newCollection: Collection = {
            name,
            user_id: userId,
        };

        // Llamamos a la consulta para crear la colección
        const collectionId = await createCollection(newCollection);

        res.status(201).json({ message: 'Colección creada exitosamente', collectionId });
    } catch (error) {
        console.error('Error al crear la colección:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getCollectionsController = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).json({ message: 'No estás autenticado' });
    }
    try {
        const collections = await getCollectionByUser(userId);
        res.json(collections);
    } catch (error) {
        console.error('Error al obtener las colecciones:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}