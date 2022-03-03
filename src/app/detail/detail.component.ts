import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../provider/api';
import { ProductType } from '../provider/order.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  item:any;
  id: string;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService


    )

    {
    this.id = (this.route.snapshot.paramMap.get('id') as string);
    console.log("🚀 DetailComponent ~ this.id", this.id)
    this.getProduct();
    //this.item = productList.find(x => x.id === this.id) as ProductType;

    //this.item = null;
    //console.log("🚀 ~ constructor ~ this.id", this.item)
  }

  ngOnInit(): void {
  }

  private async getProduct(){
    const response = await this.apiService.getProduct(this.id).toPromise();
    if(response)
      this.item = response;
  }

}
