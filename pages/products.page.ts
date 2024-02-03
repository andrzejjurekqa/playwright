import { Page, Locator } from "@playwright/test";

export class ProductPage {
    constructor(page) {
        this.page = page;
        this.shoppingCart = page.locator('#shopping_cart_container');
        this.sortingButton = page.locator('.product_sort_container');
        this.inventory = page.locator('#inventory_container');
    }
}