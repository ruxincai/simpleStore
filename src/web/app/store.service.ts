import {Injectable} from '@angular/core';
import {httpGet} from "./http";
import {extractJSON} from "./http";

export interface Product {
    id: number;
    code: string;
    name: string;
    price: number;
    description: string;
    imagePath: string;
}

let productsPromise = Promise.resolve(httpGet('api/products').then(extractJSON));

export class CartItem {
    constructor(public id: number, public name: string) { }
}

let CART_ITEMS = [
    new CartItem(11, 'Mr. Nice'),
    new CartItem(12, 'Narco'),
    new CartItem(13, 'Bombasto'),
    new CartItem(14, 'Celeritas'),
    new CartItem(15, 'Magneta'),
    new CartItem(16, 'RubberMan')
];

let cartItemsPromise = Promise.resolve(CART_ITEMS);

@Injectable()
export class StoreService {

    static nextProductId = 100;

    getProducts() { return productsPromise; }

    getProduct(id: number | string) {
        return productsPromise.then(list => list.filter(c => c.id === +id)[0]);
    }

    addProduct(name: string) {
        name = name.trim();
        if (name) {
            let product = new Product(StoreService.nextProductId++, 'NC', name, 111);
            productsPromise.then(items => items.push(product));
        }
    }

    getCartItems() { return cartItemsPromise; }

    getCartItem(id: number | string) {
        return cartItemsPromise
            .then(items => items.filter(h => h.id === +id)[0]);
    }
}