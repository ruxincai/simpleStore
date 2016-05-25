import { Component } from '@angular/core';
import { OnActivate, Router, RouteSegment } from '@angular/router';
import {Product} from "../store.service";
import {StoreService} from "../store.service";
import {getImage} from "../utils";

@Component({
    selector: 'test-detail',
    template: `
    <div *ngIf="product">

    <div class="column">
    <img src="{{currentImage}}"/>
    <div class="row">
    <img src="{{imagePath(1)}}" (mouseover)="previewImage(1)"/>
    <img src="{{imagePath(2)}}" (mouseover)="previewImage(2)"/>
    </div>
    </div>

    <div class="column stretch">
    <h2>{{product.name}}</h2>
    <h3>CDN$ {{product.price}}</h3>
    <p>{{product.description}}</p>
    </div>

    <div class="column">
    <button class="addToCart">Add to cart</button>
    <button class="removeFromCart">Remove from cart</button>
    <button (click)="gotoProducts()"><< Back to Products</button>
    </div>

    </div>
    `,
})
export class DetailComponent implements OnActivate  {
    product: Product;
    currentImage: string;
    counts: number[];

    constructor(private router: Router,
        private service: StoreService) {
    }

    routerOnActivate(curr: RouteSegment): void {
        let id = +curr.getParam('id');
        this.service.getProduct(id).then((product: Product) => {
            this.product = product;
            this.currentImage = getImage(product, 1);
        });
    }

    imagePath(size: number) {
        return getImage(this.product, size);
    }

    previewImage(size: number) {
        this.currentImage = getImage(this.product, size);
    }

    gotoProducts() {
        let productId = this.product ? this.product.id : null;
        // Pass along the hero id if available
        // so that the HeroList component can select that hero.
        // Add a totally useless `foo` parameter for kicks.
        this.router.navigate([`/products`]);
    }
}