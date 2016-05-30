import { Component} from '@angular/core';
import { OnActivate, Router, RouteSegment } from '@angular/router';
import {Product} from "../store.service";
import {StoreService} from "../store.service";

@Component({
	template: `
    <div class="column">
    You have cancelled the PayPal payment process.
    </div>
    <button (click)="gotoProducts()"><< Back to Products</button>
    `,
})
export class CancelComponent implements OnActivate {

	gotoProducts() {
		window.location.href = '/simpleStore/products';
	}
}