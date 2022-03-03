import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../provider/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  nom_user?: string;
  password?: string;
  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userLocal = localStorage.getItem('user');
    if (userLocal)
      this.router.navigateByUrl('product-list');

  }

  async login() {
    console.log('test...');
    const response = await this.loginService.login({ nom_user: this.nom_user, password: this.password }).toPromise();
    console.log("🚀 ~ login ~ response", response)
    if (response.user) {
      localStorage.setItem('user', JSON.stringify(response.user))
      this.router.navigateByUrl('product-list');
    }
  }

}
