import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  path: string = 'http://localhost:3000/products';
  constructor(
    protected httpClient: HttpClient,
  ) {

  }

  public getProducts(): Observable<any> {

    const response = this.httpClient.get(this.path);
    console.log(response);
    return response;


  }

  public getProduct(id: string): Observable<any> {
    const response = this.httpClient.get(this.path + `/${id}`);
    console.log(response);
    return response;

  }
}
