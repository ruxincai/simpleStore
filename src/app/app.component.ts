import { Component, OnInit } from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';

import { DialogService }         from './dialog.service';
import { StoreService }           from './store.service';
import { ProductsComponent } from "./products/products.component";
import { DetailComponent } from "./detail/detail.component";

@Component({
    selector: 'my-app',
    template: `
    <h1 class="title">Online Store</h1>
    <!--<nav>
      <a [routerLink]="['/products']">Products</a>
      <a [routerLink]="['/detail']">Detail</a>
    </nav>-->
    <router-outlet></router-outlet>
  `,
    providers:  [DialogService, StoreService],
    directives: [ROUTER_DIRECTIVES]
})
@Routes([
    {path: '',  component: ProductsComponent}, //default route
    {path: '/products',  component: ProductsComponent},
    {path: '/detail/:id', component: DetailComponent}
])
export class AppComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit() {
        this.router.navigate(['/']);
    }
}