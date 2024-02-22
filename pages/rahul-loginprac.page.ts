import { Page, Locator, expect} from "@playwright/test"

export class RahulLoginPractice {
    url: string;
    documentLink: Locator;
    page: Page;
    usernameField: Locator;
    passwordField: Locator;
    loginButton: Locator;
    dropdown: Locator;
    radioButton: Locator;
    terms: Locator;
    okPrompt: Locator;

    constructor(page) {
        this.page = page;
        this.url = "https://rahulshettyacademy.com/loginpagePractise/";
        this.documentLink = page.locator("[href*='documents-request']");
        this.usernameField = page.locator("#username");
        this.passwordField = page.locator("#password");
        this.loginButton = page.locator("#signInBtn");
        this.dropdown = page.locator("select.form-control");
        this.radioButton = page.locator(".radiotextsty");
        this.terms = page.locator("#terms");
        this.okPrompt = page.locator("#okayBtn");
    }
    goToLoginPrac(){
        return this.page.goto(this.url);
    }
    async pracLoginInval() {
        await this.usernameField.fill("rahulshetty");
        await this.passwordField.fill("learning");
        await this.loginButton.click();
        await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
    }
}