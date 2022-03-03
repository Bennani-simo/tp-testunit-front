import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../provider/api';
import { OrderDto, OrderService, OrderStatus, ProductType, UserDto } from '../provider/order.service';
import { ProductService } from '../provider/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public productList: ProductType[] = [];
  public order?: OrderDto;
  public productAdd?: ProductType;
  public apiList:any[]=[];

  public loading?: boolean = false;
  public userConnected?: UserDto;
  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {






    this.loadProduct();
  }




  async loadProduct() {
    this.loading = true;
    const localResponse = localStorage.getItem('productList');
    if (localResponse) {
      this.productList = JSON.parse(localResponse);
    }
    else {
      const response = await this.apiService.getCharacter().toPromise();
      if (response) {
        this.apiList = Object.values(response) ;
        console.log("🚀 ProductListComponent ~ loadProduct ~ apiProduct", this.apiList)

      }
    }

    this.loading = false;
  }
  async addToCart(product: ProductType) {

    if (!this.order?.cart || !this.order?.cart?.produits?.length) {
      Object.assign({
        cart: {
          produits: [product],
        },
        statut: OrderStatus.PREPARATION
      },
        this.order);
    }
    else {
      this.order.cart.produits.push(product);
    }
    this.productAdd = product;

  }

  getCrosselProduct() {
    return this.productList.filter(x => x.category === this.productAdd?.category && x.id !== this.productAdd?.id);
  }


}
