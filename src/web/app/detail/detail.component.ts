import { Component } from '@angular/core';
import { OnActivate, Router, RouteSegment } from '@angular/router';
import {Product} from "../store.service";
import {StoreService} from "../store.service";

@Component({
    template: `
  <h2>HEROES</h2>
  <div *ngIf="product">
    <h3>"{{product.name}}"</h3>
    <div>
      <label>Id: </label>{{product.id}}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="product.name" placeholder="name"/>
    </div>
    <p>
      <button (click)="gotoProducts()">Back</button>
    </p>
    <span>{{product.imgPath}}</span>
    <img src="{{product.imgPath}}"/>
  </div>
  `,
})
export class DetailComponent implements OnActivate  {
    product: Product;
    foo: string;
    imgPath: string;

    constructor(
        private router: Router,
        private service: StoreService) {}


    routerOnActivate(curr: RouteSegment): void {
        let id = +curr.getParam('id');
        this.service.getProduct(id).then((product: Product) => {
            this.product = product;
            this.foo = product.name;
            this.imgPath = product.imgPath;
        });
    }

    gotoProducts() {
        let productId = this.product ? this.product.id : null;
        // Pass along the hero id if available
        // so that the HeroList component can select that hero.
        // Add a totally useless `foo` parameter for kicks.
        this.router.navigate([`/products`]);
    }
}