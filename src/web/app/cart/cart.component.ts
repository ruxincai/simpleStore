import {Component} from '@angular/core';
import { OnActivate, Router, RouteSegment, RouteTree } from '@angular/router';
import {StoreService} from "../store.service";
import {CartItem} from "../store.service";

@Component({
	selector: 'test-cart',
	template: `
	<h2>Thanks for shopping at Ruxin's Online Store</h2>
	<div>This is your shopping cart, here you can edit the items, go back to the products page, clear the cart or check out.</div>

	<div class="row stretch">

	<div class="stretch">
	<p *ngIf="storeService.cartItems.length == 0">You do not have any items in the cart yet</p>
	<table *ngIf="storeService.cartItems.length > 0" class="listTable">
	<thead>
	<th>Item</th>
	<th>Quantity</th>
	<th>Price (CDN$)</th>
	</thead>
	<tbody>
	<tr *ngFor="let item of storeService.cartItems; let i=index; trackBy:itemIdTracker">
	<td align="left">{{item.product.name}}</td>
	<td align="center"><input #input type="number" value="{{item.quantity}}" (input)="changeQuantity(input, item)"></td>
	<td align="center">{{item.getTotalPrice()}}</td>
	<td align="center" width="20px" style="color: #ce1126"><span class="editBtn clickable" (click)="storeService.removeCartItem(item)">&#58885;</span></td>
	</tr>
	<tr>
	<td align="left">Total</td>
	<td align="center">{{storeService.getTotalCount()}}</td>
	<td align="center">{{storeService.getTotalPrice()}}</td>
	<td></td>
	</tr>
	</tbody>
	</table>
	</div>

	<div class="column">
    <button (click)="gotoProducts()"><< Back to Products</button>
    <button [disabled]="storeService.cartItems.length == 0" class="removeFromCart" (click)="storeService.clearCart()">Clear Cart</button>
    <button [disabled]="storeService.getTotalPrice() == 0" (click)="checkout('PayPal', true)" class="checkout">Check out using PayPal</button>
    <button [disabled]="storeService.getTotalPrice() == 0" (click)="checkout('Google', true)" class="checkout">Check out using Google</button>
    </div>

    </div>
	`
})

export class CartComponent implements OnActivate {
	checkoutParams;

	constructor(private storeService: StoreService,
			private router: Router) {
		this.addCheckoutParameters('PayPal', '34590825f');
		this.addCheckoutParameters('Google', 'safweof3223', {
			ship_method_name_1: "UPS Next Day Air",
			ship_method_price_1: "20.00",
			ship_method_currency_1: "USD",
			ship_method_name_2: "UPS Ground",
			ship_method_price_2: "15.00",
			ship_method_currency_2: "USD"
		})
	}

	itemIdTracker(i: number, c: CartItem): string {
		return c.code;
	}

	changeQuantity(target: any, item: CartItem) {
		if (target.value < 0) {
			target.value = 0;
		}
		item.quantity = parseInt(target.value);
	}

	checkout(service?: String, clearCart?: boolean) {
		//select service
		if (service === undefined) {
			let p = this.checkoutParams[Object.keys(this.checkoutParams)[0]];
			service = p.serviceName;
		}
		if (service == null) {
			throw "Provide at least one checkout service.";
		}
		let params = this.checkoutParams[service];
		if (params == null) {
			throw "Cannot get checkout parameters for '" + service + "'.";
		}
		//invoke
		switch (params.serviceName) {
			case 'PayPal':
				this.checkoutPayPal(params, clearCart);
				break;
			case 'Google':
				this.checkoutGoogle(params, clearCart);
				break;
			default:
				throw "Unknown checkout service: '" + params.serviceName + "'.";
		}
	}

	addCheckoutParameters(service: string, merchantId: string, options?:any) {
		//this.checkoutParams.add();
	}

	checkoutPayPal(params, clearCart) {
		//
	}

	gotoProducts() {
		this.router.navigate([`/products`]);
	}
}