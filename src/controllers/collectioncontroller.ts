import { Request, Response } from 'express';
import { createCollection } from '../queries/collectionQueries';
import { Collection } from '../models/Collection';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';

export const createCollectionController = async (req: AuthenticatedRequest, res: Response) => {
    const { name } = req.body;
    const userId = req.user?.id;
    console.log("ID de usuario", userId); 
    // Validar que se han enviado los campos necesarios
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
