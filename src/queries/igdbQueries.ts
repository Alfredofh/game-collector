import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const CLIENT_ID = process.env.IGDB_CLIENT_ID;
const CLIENT_SECRET = process.env.IGDB_CLIENT_SECRET;

let igdbToken: string;

// Obtener o renovar el token
export const getTokenIGDB = async (): Promise<string> => {
    if (igdbToken) return igdbToken;

    try {
        const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
            params: {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: 'client_credentials',
            },
        });

        igdbToken = response.data.access_token;
        return igdbToken;
    } catch (error) {
        console.error('Error al obtener el token de IGDB:', error);
        throw new Error('No se pudo autenticar con IGDB');
    }
};

// Buscar juegos en IGDB
export const searchGamesIGDB = async (query: string): Promise<any[]> => {
    try {
        const token = await getTokenIGDB();

        const response = await axios.post(
            'https://api.igdb.com/v4/games',
            `fields name, platforms.name, first_release_date, summary, cover.url; search "${query}"; limit 10;`,
            {
                headers: {
                    'Client-ID': CLIENT_ID,
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data; // Retornar datos obtenidos
    } catch (error) {
        console.error('Error al buscar en IGDB:', error);
        throw new Error('Error al buscar en IGDB');
    }
};
