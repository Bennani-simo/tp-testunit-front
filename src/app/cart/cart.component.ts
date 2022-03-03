import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartDto, OrderDto, OrderService, OrderStatus, ProductType } from '../provider/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  paymentHandler: any = null;
  private _product: ProductType | undefined;

  @Input('product') set product(v: ProductType | undefined) {
    this._product = v;
    if (this._product) {
      this.productCartList.push(this._product);
    }
  }

  get product(): ProductType | undefined {
    return this._product;
  }

  @Input('order') order?: OrderDto;
  productCartList: ProductType[] = [];

  @Input('crossel_product') crossel_products: ProductType[] = []

  total_amount?: number;
  constructor(
    private orderService: OrderService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.log("🚀 ~ order", this.order)
  }

  async validateCommand() {

    this.total_amount = this.productCartList.map(x => x.price).reduce((a, b) => a + b);
    // const order = { id_order: this.order?.id_order, statut: OrderStatus.PREPARATION, cart: { produits: this.productCartList, prix_total: this.productCartList.map(x => x.price).reduce((a, b) => a + b) } }
    // const response = await this.orderService.updateOrder(order).toPromise();
    //  console.log("🚀 ~ validateCommand ~ response", response)

    const stripeResponse: any = await this.orderService.stripePayment(this.total_amount, 3).toPromise();
    if (stripeResponse.url) {
      window.open(stripeResponse.url, '_blank');
    }
    console.log("🚀 ~ validateCommand ~ stripeResponse", stripeResponse.url);
  }

}
