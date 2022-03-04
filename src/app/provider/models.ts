export interface ProductType {
    name: string;
    imageUrl?: string;
    price: number;
    id: string;
    qte?: number;
}

export enum PanierStatus {
    ARCHIVED = 'archivé',
    ACTIF = 'actif'
}

export interface panierProduct {
    qte?: number;

    productId?: string;

    panierId?: string;

    product?: ProductType;
}

export interface Cart {
    id?: string;
    panierProducts?: panierProduct[];
    statut?: PanierStatus;

}