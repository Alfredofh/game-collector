export interface Game {
    id?: number;
    name: string;
    platform?: string;
    release_year?: number;
    value?: number;
    upc?: string;
    ean?: string;
    description?: string;
    image_url?: string;
    collection_id: number;
}
