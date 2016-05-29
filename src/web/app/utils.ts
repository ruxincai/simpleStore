import {Product} from "./store.service";

export function getImage(product?: Product, size?: number): string {
	if (product == null) {
		return null;
	}
	if (size === undefined) {
		return product.imagePath + product.code + '_small.jpg';
	}
	return product.imagePath + product.code + '_large_' + size + '.jpg';
}

export function build(data): HTMLElement {
	if (!data.tag) {
		throw new Error('Missing tag');
	}
	var element = document.createElement(data.tag);
	if (data.style) {
		for (let p in data.style) {
			element.style.setProperty(p, data.style[p], '');
		}
	}
	for (let key in data) {
		if (key == 'role' || key.substr(0, 5) == 'aria-') {
			element.setAttribute(key, data[key]);
		}
		else if (key != 'tag' && key != 'style' && key != 'content') {
			element[key] = data[key];
		}
	}
	return element;
}