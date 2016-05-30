import { Component} from '@angular/core';
import { OnActivate, Router, RouteSegment } from '@angular/router';
import {Product} from "../store.service";
import {StoreService} from "../store.service";

@Component({
	template: `
    <h2 class="column">
    Thank you for your payment. Your transaction has been completed, and a receipt for your purchase has been emailed to you. You may log into your account at www.paypal.com to view details of this transaction.
    </h2>
    <button (click)="gotoProducts()"><< Back to Products</button>
    `,
})
export class CheckOutComponent implements OnActivate {

	constructor() {
		//todo: show formData that comes with the dispatched post request from PayPal.
	}

	gotoProducts() {
		window.location.href = '/simpleStore/products';
	}
}