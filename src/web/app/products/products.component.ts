import { Component } from '@angular/core';
import { OnActivate, Router, RouteSegment, RouteTree } from '@angular/router';
import {Product} from "../store.service";
import {StoreService} from "../store.service";
import {PagingService} from "../paging.service";
import {getImage} from "../utils";
import {extractJSON} from "../http";
import {httpGet} from "../http";

@Component({
    selector: 'test-products',
    template: `
	<div>Welcome to RUXIN Online Store</div>
	<div>
	<!--<input #input placeholder="Search Products" type="text" size="30" [ngFormControl]="searchTextControl" [(ngModel)]="productSearchText">-->
	<input #input placeholder="Search Products" type="text" size="30" >
	</div>
	<div class="cartInfo">cart info</div>
	<div class="stretch">
	<table class="listTable">
	<tbody>
	<tr *ngFor="let item of items; let i=index; trackBy:productIdTracker" class="clickable" (click)="selectProduct(item)">
	<td><img src="{{imagePath(item)}}"/></td>
	<td>{{item.code}}</td>
	<td class="wrap">{{item.name}}</td>
	<td class="wrap">{{item.description}}</td>
	<td>{{item.price}}</td>
	<td><button>Add to Cart</button></td>
	</tr>
	</tbody>
	</table>
	</div>
	<!--<div *ngIf="error">{{error}}</div>-->
	<!--<div *ngIf="!ready" class="spinner"></div>-->
	<div class="cartInfo">cart info</div>
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
    products: Product[];
    items: Product[];
    private currSegment: RouteSegment;
    private selectedId: number;
    pager: any = {};

    constructor(private storeService: StoreService,
        private router: Router, private pagingService: PagingService ) {
    }

    productIdTracker(i: number, p: Product): number {
        return p.id;
    }

    isSelected(products: Product) { return products.id === this.selectedId; }

    routerOnActivate(curr: RouteSegment, prev: RouteSegment, currTree: RouteTree) {
        this.currSegment = curr;
        this.selectedId = +currTree.parent(curr).getParam('id');
        this.storeService.getProducts().then((list: Product[]) => {
            if (list.length !== 0) {
                this.products = list;
                this.setPage(1);
            }
        })
    }

    imagePath(product: Product) {
        return getImage(product);
    }

    setPage(page: number) {
        if (this.products !== undefined) {
            if (page < 1) {
                return;
            }
            // get pager object from storeService
            this.pager = this.pagingService.getPager(
                    this.products.length, page, 5);
            // get current page of items
            this.items = this.products.slice(this.pager.startIndex,
                    this.pager.endIndex);
        }
    }

    selectProduct(product: Product) {
        // Absolute link
        this.router.navigate([`/detail`, product.id]);

        // Relative link
        //this.router.navigate([`./${product.id}`], this.currSegment);
    }

}
