import {Product} from "./store.service";

export function getImage(product: Product, size?: number): string {
	if (size === undefined) {
		return product.imagePath + product.code + '_small.jpg';
	}
	return product.imagePath + product.code + '_large_' + size + '.jpg';
}