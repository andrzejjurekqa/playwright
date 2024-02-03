import { Page, Locator } from "@playwright/test";

export class ProductPage {
    constructor(page) {
        this.page = page;
        this.shoppingCart = page.locator('shopping_cart_container');
    }
}