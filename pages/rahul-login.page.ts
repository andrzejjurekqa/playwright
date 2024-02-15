import {Page, Locator} from "@playwright/test"

export class RahulPage {
    page: Page;
    emailField: Locator;
    passwordField: Locator;
    loginButton: Locator;
    invalidMessage: Locator;

    constructor(page) {
        //id preswent = #id
        //class attribute present = .class
        //css attributes present = [attribute ='attribute name']
        //text present = text''
        //xpath
        //how to get to child: ".class a" with nth() to call specific item in the list [0, 1, 2 ...]

        //page.locator(".class a").first().textContent()
        //page.locator(".class a").nth(1).textContent() / second etc

        //allTextContents() does not have any actions, so specify something else too
        this.page = page;
        this.emailField = page.locator('#email'); //#email email
        this.passwordField = page.locator('#password');
        this.loginButton = page.locator(`[value = 'Log in']`);
        this.invalidMessage = page.locator('html/body/main/div/div[4]/div/span/svg')
    }

    async provideInvCredentials(): Promise<void> {
        await this.emailField.fill('username');
        await this.passwordField.fill('password');
        await this.loginButton.click();
    }
    async provideValidCredentials(): Promise<void> {
        await this.emailField.fill('rahul_shetty');
        await this.passwordField.fill('password');
        await this.loginButton.click();
    }
}



