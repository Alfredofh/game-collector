import { Request, Response } from 'express';
import { createCollection, getCollectionByUser, getCollectionById, updateCollection, deleteCollection } from '../queries/collectionQueries';
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

export const getCollectionByIdController = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id; // Obtenemos el userId del token
    const collectionId = parseInt(req.params.id, 10); // Obtenemos el collectionId de los parámetros de la URL

    if (!userId) {
        return res.status(401).json({ message: 'No estás autenticado' });
    }

    if (isNaN(collectionId)) {
        return res.status(400).json({ message: 'El ID de la colección no es válido' });
    }

    try {
        const collection = await getCollectionById(collectionId, userId);
        if (!collection) {
            return res.status(404).json({ message: 'Colección no encontrada o no autorizada' });
        }

        res.status(200).json(collection);
    } catch (error) {
        console.error('Error al obtener la colección:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateCollectionController = async (req: AuthenticatedRequest, res: Response) => {
    const collectionId = parseInt(req.params.id, 10);

    const userId = req.user?.id;
    const { name } = req.body;
    if (!collectionId || !userId || !name) {
        return res.status(400).json({ message: 'Nombre, ID de colección e ID de usuario son obligatorios' });
    }

    try {
        const affectedRows = await updateCollection(collectionId, userId, name);

        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Colección no encontrada o no autorizada' });
        }

        res.status(200).json({ message: 'Colección actualizada exitosamente' });
    } catch (error) {
        console.error('Error al actualizar la colección:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteCollectionByIdController = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id; // Obtenemos el userId del token
    const collectionId = parseInt(req.params.id, 10); // Obtenemos el collectionId de los parámetros de la URL

    if (!userId) {
        return res.status(401).json({ message: 'No estás autenticado' });
    }

    if (isNaN(collectionId)) {
        return res.status(400).json({ message: 'El ID de la colección no es válido' });
    }

    try {
        const success = await deleteCollection(collectionId, userId);
        if (!success) {
            return res.status(404).json({ message: 'Colección no encontrada o no autorizada' });
        }
        res.status(200).json({ message: 'Colección borrada exitosamente' });
    } catch (error) {
        console.error('Error al borrar la colección:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};