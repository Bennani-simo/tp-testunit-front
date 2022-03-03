import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tp-archilog';
  constructor(
    private router: Router
  ) {
    console.log('init');
  }

  goto() {
    this.router.navigateByUrl('cart');
  }
}
