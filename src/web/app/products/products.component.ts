import { Component } from '@angular/core';
import { Control } from '@angular/common';
import { OnActivate, Router, RouteSegment, RouteTree } from '@angular/router';
import {Product} from "../store.service";
import {StoreService} from "../store.service";
import {PagingService} from "../paging.service";
import {getImage} from "../utils";
import {CartItem} from "../store.service";
import 'rxjs/Rx';

@Component({
    selector: 'test-products',
    template: `
	<div>Welcome to RUXIN Online Store</div>
	<div>
	<input #input placeholder="Search Products by name" type="text" size="30" [ngFormControl]="searchTextControl" [(ngModel)]="productSearchText">
	</div>
	<div class="cartInfo clickable" (click)="gotoCart($event)">
	<img src="images/cart.png" width="20px" height="20px"/>
	<span> {{storeService.getTotalCount()}} items,  Total: $ {{storeService.getTotalPrice()}} (CDN)</span>
	</div>
	<div class="stretch">
	<table class="listTable">
	<tbody>
	<tr *ngFor="let item of items; let i=index; trackBy:productIdTracker" class="clickable" (click)="selectProduct(item)">
	<td><img src="{{imagePath(item)}}"/></td>
	<td>{{item.code}}</td>
	<td class="wrap">{{item.name}}</td>
	<td class="wrap">{{item.description}}</td>
	<td>{{item.price}}</td>
	<td><button (click)="addToCart($event, item)">Add to Cart</button></td>
	</tr>
	</tbody>
	</table>
	</div>
	<!--<div *ngIf="error">{{error}}</div>-->
	<!--<div *ngIf="!ready" class="spinner"></div>-->
	<div class="cartInfo clickable" (click)="gotoCart($event)">
	<img src="images/cart.png" width="20px" height="20px"/>
	<span> {{storeService.getTotalCount()}} items,  Total: $ {{storeService.getTotalPrice()}} (CDN)</span>
	</div>
	<!-- pager -->
	<ul *ngIf="pager.pages && pager.pages.length > 0" class="pagination">
		<li class="clickable" [ngClass]="{disabled: pager.currentPage === 1}">
			<a (click)="setPage(1)">First</a>
		</li>
		<li class="clickable" [ngClass]="{disabled: pager.currentPage === 1}">
			<a (click)="setPage(pager.currentPage - 1)">Previous</a>
		</li>
		<li class="clickable" *ngFor="let page of pager.pages;" [ngClass]="{active: pager.currentPage === page}">
			<a (click)="setPage(page)">{{page}}</a>
		</li>
		<li class="clickable" [ngClass]="{disabled: pager.currentPage === pager.totalPages}">
			<a (click)="setPage(pager.currentPage + 1)">Next</a>
		</li>
		<li class="clickable" [ngClass]="{disabled: pager.currentPage === pager.totalPages}">
			<a (click)="setPage(pager.totalPages)">Last</a>
		</li>
	</ul>
	`
})

export class ProductsComponent implements OnActivate {
    products: Product[] = [];
    items: Product[];
    pager: any = {};
    searchTextControl = new Control('');
    productSearchText: string;
    filteredList: Product[];

    constructor(private storeService: StoreService,
        private router: Router, private pagingService: PagingService ) {
        this.storeService.getProducts().then((list: Product[]) => {
            this.products = list;
            this.setPage(1, list);
        });
        this.searchTextControl.valueChanges.debounceTime(500).distinctUntilChanged()
                .subscribe((st: string) => this.filterProducts(st));
    }

    filterProducts(str: string) {
        if (str === undefined || str == '') {
            this.filteredList = this.products;
        }
        else {
            sessionStorage['productsSearch'] = str;
            this.productSearchText = str;
            this.filteredList = this.products.filter(item => {
                let val = str.toLowerCase();
                if (item.name.toLocaleLowerCase().indexOf(val) === 0) {
                    return true;
                }
                if (item.name.toLocaleLowerCase().indexOf(val) > 0) {
                    return true;
                }
            });
        }
        this.setPage(1);
    }

    productIdTracker(i: number, p: Product): number {
        return p.id;
    }

    imagePath(product: Product) {
        return getImage(product);
    }

    setPage(page: number, list?: Product[]) {
        if (list === undefined) {
            list = this.filteredList;
        }
        if (page < 1) {
            return;
        }
        // get pager object from storeService
        this.pager = this.pagingService.getPager(list.length, page, 5);
        // get current page of items
        this.items = list.slice(this.pager.startIndex, this.pager.endIndex);
    }

    selectProduct(product: Product) {
        localStorage['selectedProduct'] = JSON.stringify(product);
        window.location.href = '/simpleStore/detail';
    }

    addToCart(event: any, product: Product) {
        event.stopPropagation();
        event.preventDefault();
        this.storeService.addCartItem(product);
    }

    gotoCart(event: any) {
        window.location.href = '/simpleStore/cart';
    }
}
