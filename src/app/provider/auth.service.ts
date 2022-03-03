import { Injectable } from "@angular/core";
import { UserDto } from "./order.service";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    public static User: UserDto
    constructor() { }

}