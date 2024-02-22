import {Page, Locator} from "@playwright/test"

export class RahulLoginPage {
    page: Page;
    usernameField: Locator;
    passwordField: Locator;
    loginButton: Locator;
    invalidMessage: Locator;

    constructor(page) {
        this.page = page;
        this.usernameField = page.locator('#userEmail'); //#email email
        this.passwordField = page.locator("#userPassword");
        this.loginButton = page.locator("#login");
        this.invalidMessage = page.locator('html/body/main/div/div[4]/div/span/svg');
    }
    async invCredentials(): Promise<void> {
        await this.usernameField.fill('username');
        await this.passwordField.fill('password');
        await this.loginButton.click();
    }
    async validCredentials(): Promise<void> {
        await this.usernameField.fill('anshika@gmail.com');
        await this.passwordField.fill('Iamking@000');
        await this.loginButton.click();
    }
    async goToLogin() {
        await this.page.goto('https://rahulshettyacademy.com/client/');
    }
}


