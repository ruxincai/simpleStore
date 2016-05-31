import { Component, OnInit } from '@angular/core';
import { Headers } from '@angular/http';
import { OnActivate, Router, RouteSegment, RouteParams } from '@angular/router';
import {Product} from "../store.service";
import {StoreService} from "../store.service";
import {Headers} from "../http";

@Component({
	template: `
    <h2 class="column">
    Thank you for your payment. Your transaction has been completed, and a receipt for your purchase has been emailed to you. You may log into your account at www.paypal.com to view details of this transaction.
    </h2>
    <p>
    this is for showing the submitted transaction
    </p>
    <button (click)="gotoProducts()"><< Back to Products</button>
    `,
})
export class CheckOutComponent implements OnActivate {

	constructor(location: Location) {
		//todo: show formData that comes with the dispatched post request from PayPal.
		console.log('location: ', location);
	}

	routerOnActivate(curr: RouteSegment) {
		console.log('curr: ', curr);
	}

	gotoProducts() {
		window.location.href = '/simpleStore/products';
	}
}