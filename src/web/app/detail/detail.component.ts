import { Component} from '@angular/core';
import { OnActivate, Router, RouteSegment } from '@angular/router';
import {Product} from "../store.service";
import {StoreService} from "../store.service";
import {getImage} from "../utils";

@Component({
    selector: 'test-detail',
    template: `
    <div>
    <div class="column">
    <img src="{{currentImage}}"/>
    <div class="row">
    <img src="{{imagePath(1)}}" (mouseover)="previewImage(1)"/>
    <img src="{{imagePath(2)}}" (mouseover)="previewImage(2)"/>
    </div>
    </div>
    <div *ngIf="p != null" class="column stretch">
    <h2>{{p.name}}</h2>
    <h3>CDN$ {{p.price}}</h3>
    <p class="stretch">{{p.description}}</p>
    </div>
    <div class="column">
    <button (click)="gotoProducts()"><< Back to Products</button>
    <button class="addToCart" (click)="storeService.addCartItem(p)">Add to cart</button>
    <button class="removeFromCart" (click)="storeService.removeItem(p)">Remove from cart</button>
    <div class="cartInfo clickable" (click)="gotoCart($event)">
	<img src="images/cart.png" width="20px" height="20px"/>
	<span> {{storeService.getTotalCount()}} items,  Total: $ {{storeService.getTotalPrice()}} (CDN)</span>
	</div>
	<div *ngIf="storeService.hasItem(p)" style="align-self: center; margin: 5px 0 15px">This item is already in the cart</div>
    </div>
    </div>
    `,
})
export class DetailComponent implements OnActivate {
    p: Product;
    currentImage: string;

    constructor(private router: Router,
        private storeService: StoreService) {
        this.p = JSON.parse(localStorage.getItem('selectedProduct'));
        this.previewImage(1);
    }

    routerOnActivate(curr: RouteSegment): void {
    }

    imagePath(size: number) {
        return getImage(this.p, size);
    }

    previewImage(size: number) {
        this.currentImage = getImage(this.p, size);
    }

    gotoProducts() {
        window.location.href = '/simpleStore/products';
    }

    gotoCart(event: any) {
        window.location.href = '/simpleStore/cart';
    }

    ngOnDestroy() {
        let t = JSON.stringify(this.storeService.cartItems);
        console.log('detail page onDestroy, items stored: ', t);
        localStorage.setItem('cartItems', t);
    }
}