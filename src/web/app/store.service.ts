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
    private totalPrice;
    constructor(public code: string, public product: Product,
            public quantity: number) {
    }
    getTotalPrice() {
        return this.quantity * this.product.price;
    }
}

@Injectable()
export class StoreService {

    static nextCartItemId = 100;

    cartItems: CartItem[] = [];

    getProducts() { return productsPromise; }

    getProduct(id: number | string) {
        return productsPromise.then(list => list.filter(c => c.id === +id)[0]);
    }

    addCartItem(product: Product, quantity?: number) {
        let item = this.cartItems.find(item => item.code === product.code);
        if (item) {
            if (quantity == 0) {
                this.cartItems.splice(this.cartItems.indexOf(item), 1);
            }
            else if (quantity > 0) {
                item.quantity = quantity;
            }
            else {
                ++item.quantity;
            }
        }
        else {
            this.cartItems.push(new CartItem(product.code, product,
                    quantity === undefined ? 1 : quantity));
        }
    }

    removeCartItem(item: CartItem) {
        let idx = this.cartItems.indexOf(item);
        if (idx > -1) {
            this.cartItems.splice(idx, 1);
        }
    }

    clearCart() {
        this.cartItems = [];
    }

    getCartItems() { return this.cartItems; }

    getCartItem(code: string) {
        return this.cartItems.find(item => item.code === code);
    }

    getTotalCount(code?: string) {
        let count = 0;
        if (code === undefined) {
            this.cartItems.forEach(item => {
                count += item.quantity;
            });
        }
        this.cartItems.forEach(item => {
            if (item.code === code) {
                ++count;
            }
        });
        return count;
    }

    getTotalPrice(code?: string) {
        let price = 0;
        if (code === undefined) {
            this.cartItems.forEach(item => {
                price += item.product.price * item.quantity;
            });
            return price;
        }
        this.cartItems.forEach(item => {
           if (item.code === code) {
               price += item.product.price * item.quantity;
           }
        });
        return price;
    }

}