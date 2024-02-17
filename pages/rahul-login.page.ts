import {Page, Locator} from "@playwright/test"

export class RahulPage {
    page: Page;
    usernameField: Locator;
    passwordField: Locator;
    loginButton: Locator;
    invalidMessage: Locator;
    productId: Locator;
    addButton: Locator;
    cardTitles: Locator;
    documentLink: Locator;
    checkoutButton: Locator;
    addIphone: Locator;


    constructor(page) {
        this.page = page;
        this.usernameField = page.locator('#username'); //#email email
        this.passwordField = page.locator("[type='password']");
        this.loginButton = page.locator("#signInBtn");
        this.invalidMessage = page.locator('html/body/main/div/div[4]/div/span/svg');
        this.productId = page.locator('.app-body');
        this.addButton = page.getByRole('button', {name: 'Add '});
        this.addIphone = this.productId.filter({ hasText: 'Add ' }).getByRole('button');
        this.cardTitles = page.locator(".card-body a");
        this.documentLink = page.locator("[href*='documents-request']");
        this.checkoutButton = page.getByText('Checkout');       
    }
    async provideInvCredentials(): Promise<void> {
        await this.usernameField.fill('username');
        await this.passwordField.fill('password');
        await this.loginButton.click();
    }
    async provideValidCredentials(): Promise<void> {
        await this.usernameField.fill('rahul_shetty');
        await this.passwordField.fill('password');
        await this.loginButton.click();
    }
    async addToCart(productName: string): Promise<void> {
        const count = await this.productId.count();
        for (let i = 0; i < count; ++i) {
            if (await this.productId.nth(i).locator("b").textContent() === productName) {
                //add to cart
                await this.productId.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }
}

//id preswent = #id
//class attribute present = .class
//css attributes present = [attribute ='attribute name']
//text present = text''
//xpath
//how to get to child: ".class a" with nth() to call specific item in the list [0, 1, 2 ...]

//page.locator(".class a").first().textContent() or .last()
//page.locator(".class a").nth(1).textContent() / second etc

//allTextContents() does not have any actions, so specify something else too

//toBeChecked - checkbox true
//toHaveAttribute('type', 'text')


