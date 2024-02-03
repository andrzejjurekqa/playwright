import { Page, Locator } from "@playwright/test";

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameField = page.locator('#user-name');
        this.passwordField = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('h3[data-test=error]');
        this.title = page.locator('.title');
    }
    async login(username:string, password:string):Promise<void>{
        await this.usernameField.type(username);
        await this.passwordField.type(password);
        await this.loginButton.click();
    }
    async error(){
        await this.errorMessage.toHaveText(/Username and password do not match any user in this service/);
    }
    async title(){
        await this.title.toHaveText('Products');
    }
}