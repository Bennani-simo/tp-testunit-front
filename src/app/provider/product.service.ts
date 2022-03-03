import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    path: string = 'http://176.129.113.86:8000/api/products';
    constructor(
        protected httpClient: HttpClient,
    ) {

    }

    public getProduct(): Observable<any> {
        return this.httpClient.get(this.path);
    }
}