import { Page, Locator } from "@playwright/test";

export class LoginPage {
    page: Locator;
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
    async login(username:string, password:string):Promise<void>{
        await this.usernameField.type(username);
        await this.passwordField.type(password);
        await this.loginButton.click();
    }
}