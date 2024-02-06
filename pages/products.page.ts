import { Page, Locator } from "@playwright/test";

export class ProductPage {
    page : Locator;
    shoppingCart: Locator;
    sortingButton: Locator;
    inventory: Locator;
    product1: Locator;
    product2: Locator;
    constructor(page) {
        this.page = page;
        this.shoppingCart = page.locator('#shopping_cart_container');
        this.sortingButton = page.locator('.product_sort_container');
        this.inventory = page.locator('#inventory_container');
        this.product1 = page.locator('');
        this.product2 = page.locator('');
    }

    //async addToShoppingCart()
}