import { Component } from '@angular/core';
import { OnActivate, Router, RouteSegment, RouteTree } from '@angular/router';

import { Product, StoreService } from "../store.service.ts";

@Component({
    template: `
    <ul class="items">
      <li *ngFor="let product of products"
        [class.selected]="isSelected(product)"
        (click)="onSelect(product)">
        <img src="{{product.imgPath}}" width="15px" height="15px"/><span class="badge">{{product.id}}</span> {{product.name}}
      </li>
    </ul>
  `,
})
export class ProductsComponent implements OnActivate {
    products: Product[];
    private currSegment: RouteSegment;
    private selectedId: number;

    constructor(
        private service: StoreService,
        private router: Router) { }

    isSelected(products: Product) { return products.id === this.selectedId; }

    routerOnActivate(curr: RouteSegment, prev: RouteSegment, currTree: RouteTree) {
        this.currSegment = curr;
        this.selectedId = +currTree.parent(curr).getParam('id');
        this.service.getProducts().then(products => this.products = products);
    }

    onSelect(product: Product) {
        // Absolute link
        this.router.navigate([`/detail`, product.id]);

        // Relative link
        //this.router.navigate([`./${product.id}`], this.currSegment);
    }
}
