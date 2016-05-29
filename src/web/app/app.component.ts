import { Component } from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';
import {DialogService} from "./dialog.service";
import {StoreService} from "./store.service";
import {ProductsComponent} from "./products/products.component";
import {DetailComponent} from "./detail/detail.component";
import {PagingService} from "./paging.service";
import {CartComponent} from "./cart/cart.component";

@Component({
    selector: 'test-app',
    template: `
	<div>
    <div><img src="images/LOGO.png"></div>
    <div>Simple Store</div>
	</div>
	<router-outlet></router-outlet>
	`,
    providers:  [DialogService, StoreService, PagingService],
    directives: [ROUTER_DIRECTIVES]
})
@Routes([
    {path: '',  component: ProductsComponent}, //default route
    {path: '/products',  component: ProductsComponent},
    {path: '/detail', component: DetailComponent},
    {path: '/cart',  component: CartComponent}
])
export class AppComponent {
    constructor(private router: Router) {
    }
}