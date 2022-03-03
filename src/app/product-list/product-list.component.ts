import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  public loading?: boolean = false;
  public userConnected?: UserDto;
  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    /*const user = localStorage.getItem('user');
    if (!user)
      this.router.navigateByUrl('login');
    else {
      this.userConnected = JSON.parse(user);
      const order = localStorage.getItem('order');
      if (!order)
        this.initOrder()
      else
        this.order = JSON.parse(order);
    }*/
    this.loadProduct();
  }

  private async initOrder() {
    const response = await this.orderService.initOrder((this.userConnected as UserDto).id_user as string).toPromise();
    console.log("🚀 ~ ngOnInit ~ response", response.order);
    if (response.order) {
      localStorage.setItem('order', JSON.stringify(response.order));
      this.order = response.order;
    }
  }

  async loadProduct() {
    this.loading = true;
    const localResponse = localStorage.getItem('productList');
    if (localResponse) {
      this.productList = JSON.parse(localResponse);
    }
    else {
      const response = await this.productService.getProduct().toPromise();
      if (response) {
        this.productList = Object.values(response)[3] as ProductType[];
        if (this.productList?.length)
          localStorage.setItem('productList', JSON.stringify(this.productList));
        console.log("🚀 ~ loadProduct ~ response", this.productList);

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
