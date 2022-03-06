import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../provider/app.service';
import { Cart, PanierStatus, ProductType } from '../provider/models';
import { PanierService } from '../provider/panier.service';
import { ProductService } from '../provider/product.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public productList: ProductType[] = [];
  public productAdd?: ProductType;
  public apiList: any[] = [];

  public cart: Cart = {};

  public loading?: boolean = false;
  AppService = AppService;
  constructor(
    private productService: ProductService,
    private panierService: PanierService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadProduct();
    this.loadCart();
  }

  private async loadCart() {
    const response = await this.panierService.getPanierActif().toPromise();
    if (response)
      this.cart = response;
    console.log("🚀 ~ loadCart ~ this.cart", this.cart)
  }
  private async loadProduct() {
    this.loading = true;

    const response = await this.productService.getProducts().toPromise();
    if (response) {
      this.apiList = Object.values(response);
      //   console.log("🚀 ProductListComponent ~ loadProduct ~ apiProduct", this.apiList)
    }

    this.loading = false;
  }
  async addToCart(product: ProductType) {
    if (!this.cart.panierProducts?.length)
      this.cart.panierProducts = [];

    this.cart.panierProducts = [
      {
        productId: product.id,
        product: product,
        panierId: this.cart.id,
        qte: 1
      },
    ];

    this.cart.statut = PanierStatus.ACTIF;

    this.productAdd = product;

    const response = await this.panierService.addPanier(this.cart).toPromise();
    if (response) {
      AppService.cartId = response.id;
    }
    this.loadCart();
  }

}
