import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cart } from "./models";

@Injectable({
    providedIn: 'root'
})
export class PanierService {
    path: string = 'http://localhost:3000/panier';
    constructor(
        private httpClient: HttpClient
    ) {

    }

    public getPanier(panierId: string): Observable<Cart> {
        return this.httpClient.get(this.path + `/${panierId}`);
    }

    public addPanier(panier: any): Observable<Cart> {
        return this.httpClient.post(this.path, panier);
    }

    public getPanierActif(): Observable<Cart> {
        return this.httpClient.get(this.path);
    }


}