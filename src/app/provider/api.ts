import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    path: string = 'https://rickandmortyapi.com/api/character';
    constructor(
        protected httpClient: HttpClient,
    ) {

    }

    public getCharacter(): Observable<any> {

      const response =  this.httpClient.get(this.path);
        console.log(response);
        return response;


    }
}
