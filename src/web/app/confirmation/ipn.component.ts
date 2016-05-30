import { Component} from '@angular/core';
import { OnActivate, Router, RouteSegment } from '@angular/router';
import {Product} from "../store.service.ts";
import {StoreService} from "../store.service.ts";

@Component({
	selector: 'test-ipn',
	template: `
    <div class="column">
    IPN confirmation page
    </div>
    `,
})
export class IPNComponent implements OnActivate {

}