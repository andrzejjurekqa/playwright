import { Page, Locator } from "@playwright/test";

export class LoginPage {

    page: Page;
    usernameField: Locator;
    passwordField: Locator;
    loginButton: Locator;
    errorMessage: Locator;
    
    constructor(page) {
        this.page = page;
        this.usernameField = page.locator('#user-name');
        this.passwordField = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('h3[data-test=error]');
    }
    async login(username:string , password:string ):Promise<void>{
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}