import { Page, Locator } from "@playwright/test";

export class ProductPage {
    
    page : Page;
    shoppingCart: Locator;
    sortingButton: Locator;
    inventory: Locator;
    product1: Locator;
    product2: Locator;
    sortNameDesc: Locator;
    sortNameAsc: Locator;
    sortPriceDesc: Locator;
    sortPriceAsc: Locator;
    productId: Locator;
    addButton: Locator;

    constructor(page) {
        this.page = page;
        this.shoppingCart = page.locator('#shopping_cart_container');
        this.sortingButton = page.locator('.product_sort_container');
        this.inventory = page.locator('#inventory_container');
        this.productId = page.locator('.inventory_item_name');
        this.addButton = page.getByRole('button', {name: 'ADD TO CART'});
        // this.product1 = page.locator('');
        // this.product2 = page.locator('');
    }

    async sort(sortingOption: string): Promise<void>{
        await this.page.locator("select.product_sort_container").selectOption(sortingOption);
    }
    async addToCart(productName: string): Promise <string> {
        for (let i = 0; i < await this.productId.count(); i++) {
            if (await this.productId.nth(i).textContent() == productName) {
                await this.addButton.nth(i).click();
                console.log(productName + ' added to cart')
            }
        }
        return 'Product not found';
    }
}