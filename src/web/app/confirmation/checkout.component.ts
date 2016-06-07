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
   	<div><span>Name:</span><span>{{testObj?.last_name}}, {{testObj?.first_name}}</span></div>
   	<div><span>Address:</span><span>{{testObj?.address_name}}, {{testObj?.address_street}}, {{testObj?.address_zip}}</span></div>
   	<div><span>City:</span><span>{{testObj?.address_city}}</span></div>
   	<div><span>State:</span><span>{{testObj?.address_state}}</span></div>
   	<div><span>Country:</span><span>{{testObj?.address_country}}</span></div>
   	<div><span>Payer Email:</span><span>{{testObj?.payer_email}}</span></div>
   	<div><span>Receiver Email:</span><span>{{testObj?.receiver_email}}</span></div>
   	<div class="separator"></div>
   	<div><span># of items:</span><span>{{testObj?.num_cart_items}}</span></div>
   	<table class="listTable">
	<tbody>
	<tr *ngFor="let idx of numOfItems;">
	<td>{{getProperty(idx, 'item_name')}}</td>
	<td>{{getProperty(idx, 'item_number')}}</td>
	<td>{{getProperty(idx, 'quantity')}}</td>
	<td align="right">$ {{getProperty(idx, 'mc_gross_')}} CAD</td>
	</tr>
	<tr>
	<td colspan="3">Total</td>
	<td align="right">$ {{testObj.mc_gross}} CAD</td>
	<td></td>
	</tr>
	</tbody>
	</table>
   	</div>
    `,
})
export class CheckOutComponent implements OnActivate {
	testObj: any = {};
	numOfItems: number[];

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
						let num = parseInt(val.num_cart_items[0]);
						this.numOfItems = Array(num).fill('').map((x, i) => i + 1);
					});
			if (sessionStorage['clearCart']) {
				storeService.clearCart();
			}
		}
	}

	routerOnActivate(curr: RouteSegment): void {
	}

	getProperty(idx: number, prefix: string) {
		let name = prefix + idx;
		let keys = Object.keys(this.testObj);
		for (let key in keys) {
			if (this.testObj.hasOwnProperty(name)) {
				return this.testObj[name];
			}
		}
		return '';
	}

	gotoProducts() {
		window.location.href = '/simpleStore/products';
	}
}