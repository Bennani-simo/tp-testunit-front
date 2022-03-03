import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface ProductType {
    name: string;
    image: string;
    price: number;
    id: number;
    description: string;
    quantity?: number;
    category?: string;
}

export interface UserDto {
    id_user?: string;
    email?: string;
    nom_user?: string,
    password?: string;
    role?: string;
    orderList?: OrderDto[];
}

export enum OrderStatus {
    INIT = "INIT",
    PREPARATION = "PREPARATION"
}

export interface OrderDto {
    id_order?: string;
    statut?: OrderStatus;
    cart?: CartDto;
}

export interface CartDto {
    id?: string;
    qte?: number;
    prix_total?: number;
    produits?: ProductType[];
}

@Injectable({
    providedIn: 'root'
})

export class OrderService {
    path: string = 'http://localhost:80';
    constructor(
        protected httpClient: HttpClient,
    ) {

    }

    public initOrder(userId: string): Observable<{ message?: string; order?: OrderDto }> {
        console.log("🚀 ~ initOrder ~ userId", userId)
        return this.httpClient.post(this.path + '/sentcommander', { userId: userId });
    }

    public updateOrder(order: OrderDto) {
        console.log("🚀 ~ updateOrder ~ order", order)
        return this.httpClient.put(this.path + '/update', {
            id_order: order.id_order,
            prix_total: order.cart?.prix_total,
            produits: order.cart?.produits
        });
    }

    public createOrUpdateOrder(order: OrderDto) {
        this.httpClient.post(this.path, order);
    }

    public stripePayment(amount: number, qte: number) {
        return this.httpClient.post(this.path + '/paiement', { montant: amount, number: qte });
    }
}