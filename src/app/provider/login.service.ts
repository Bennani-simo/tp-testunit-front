import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserDto } from "./order.service";

@Injectable({
    providedIn: 'root'
})

export class LoginService {

    path: string = 'http://localhost:80'
    constructor(
        protected httpClient: HttpClient
    ) { }

    public login(data: { nom_user?: string, password?: string }): Observable<{ message?: string; user?: UserDto }> {
        return this.httpClient.post(this.path + '/singin', data);
    }
}