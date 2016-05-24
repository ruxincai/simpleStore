import {Injectable} from '@angular/core';

export class Product {
    constructor(public id: number, public name: string, public imgPath?: string) { }
}

const PRODUCTS = [
    new Product(1, 'Dragon Burning Cities', '/images/phone/IP_small.jpg'),
    new Product(2, 'Sky Rains Great White Sharks', 'images/yo.png'),
    new Product(3, 'Giant Asteroid Heading For Earth'),
    new Product(4, 'Procrastinators Meeting Delayed Again'),
];

let productsPromise = Promise.resolve(PRODUCTS);

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
        return productsPromise
            .then(crises => crises.filter(c => c.id === +id)[0]);
    }


    addProduct(name: string) {
        name = name.trim();
        if (name) {
            let product = new Product(StoreService.nextProductId++, name);
            productsPromise.then(items => items.push(product));
        }
    }

    getCartItems() { return cartItemsPromise; }

    getCartItem(id: number | string) {
        return cartItemsPromise
            .then(items => items.filter(h => h.id === +id)[0]);
    }
}