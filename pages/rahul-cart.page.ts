import { Page, Locator } from "@playwright/test";


export class RahulCartPage {
    page: Page;
    checkoutButton: Locator;
    cartItem: Locator;

    constructor(page) {
        this.checkoutButton = page.getByRole('button', { hasText: "Checkout" });
        this.cartItem = page.locator(".ng-star-inserted");
    }
}