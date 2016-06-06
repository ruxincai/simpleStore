import { Component, OnInit } from '@angular/core';
import { OnActivate, Router, RouteSegment } from '@angular/router';
import {Product} from "../store.service";
import {StoreService} from "../store.service";
import {Location} from '@angular/common';
import {URLSearchParams} from '@angular/http';
import {httpGet} from "../http";
import {extractJSON} from "../http";

@Component({
	selector: 'test-checkout',
	template: `
    <h2 class="column">
    Thank you for your payment. Your transaction has been completed, and a receipt for your purchase has been emailed to you. You may log into your account at www.paypal.com to view details of this transaction.
    </h2>
    <button (click)="gotoProducts()"><< Back to Products</button>
    <h4>Transaction Details:</h4>
   	<div class="column detail" *ngIf="testObj">
   	<div><span class="name_col">Address:</span><span class="val_col">{{testObj?.address_name}}, {{testObj?.address_street}}, {{testObj?.address_zip}}</span></div>
   	<div><span>City:</span><span>{{testObj?.address_city}}</span></div>
   	<div><span>State:</span><span>{{testObj?.address_state}}</span></div>
   	<div><span>Country:</span><span>{{testObj?.address_country}}</span></div>
   	<div><span>Name:</span><span>{{testObj?.last_name}}, {{testObj?.first_name}}</span></div>
   	<div class="separator"></div>
   	<div><span>State:</span><span>test</span></div>
   	</div>
    `,
})
export class CheckOutComponent implements OnActivate {
	testObj: any = {};

	constructor(private location: Location,
			private storeService: StoreService) {
		//show formData that comes with the dispatched post request from PayPal.
		let path = location.path();
		path = path.substr(path.indexOf('?') + 1, path.length);
		let params = new URLSearchParams(path);
		let tid = sessionStorage['tid'];
		if (tid == undefined) {
			tid = params.get('tid');
		}
		if (tid != null && tid != undefined) {
			sessionStorage['tid'] = tid;
			httpGet('api/transactions/' + tid).then(extractJSON)
					.then(val => {
						this.testObj = val;
					});
			if (sessionStorage['clearCart']) {
				storeService.clearCart();
			}
		}
	}

	routerOnActivate(curr: RouteSegment): void {
	}

	gotoProducts() {
		window.location.href = '/simpleStore/products';
	}
}