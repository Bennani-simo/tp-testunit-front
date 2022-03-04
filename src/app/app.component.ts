import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { AppService } from './provider/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tp-archilog';
  public AppService = AppService;
  constructor(
    private router: Router
  ) {
    console.log('init');
  }

  goto() {
    this.router.navigateByUrl(`cart`);
  }
  goto1() {
    this.router.navigateByUrl('product-list');
  }
}
