import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart, ProductType } from '../provider/models';
import { PanierService } from '../provider/panier.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input('cart') cart: Cart = {};
  idCart?: string;
  constructor(
    private panierService: PanierService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    /* this.route.queryParams.subscribe(params => {

      this.idCart = params['idCart'];
    }) */
    this.loadCart();
  }

  async loadCart() {
    const cartResponse = await this.panierService.getPanierActif().toPromise();
    console.log("🚀 ~ loadCart ~ cartResponse", cartResponse)
    if (cartResponse)
      this.cart = cartResponse;
  }

  async onDeleteItem(id: string | undefined) {
    if (!id)
      return;
    const deleteResponse = await this.panierService.deletePanier(id as string).toPromise();
    console.log("🚀 ~ onDeleteItem ~ deleteResponse", deleteResponse)
    this.loadCart();
  }

}
