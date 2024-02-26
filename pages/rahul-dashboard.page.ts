import { Page, Locator } from "@playwright/test"

export class RahulDashboardPage {
    page: Page;
    shoppingCart: Locator;
    productId: Locator;
    cardTitles: Locator;
    checkoutButton: Locator;
    orders: Locator;

    constructor(page) {
        this.shoppingCart = page.locator("[routerlink*='cart']");
        this.productId = page.locator('.card-body');
        this.cardTitles = page.locator(".card-body b");
        this.orders = page.locator("button[routerlink*='myorders']");

    }
    async addToCart(productName: string): Promise<void> {
        const titles = await this.cardTitles.allTextContents();
        const count = await this.productId.count();
        for (let i = 0; i < count; ++i) {
            if (await this.productId.nth(i).locator("b").textContent() === productName) {
                //add to cart
                await this.productId.nth(i).locator("text= Add To Cart").click()
                break;
            }
        }
    }
}