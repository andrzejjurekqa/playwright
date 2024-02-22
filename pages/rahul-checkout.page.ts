import { Page, Locator } from "@playwright/test";


export class RahulCheckoutPage {
    cardField: Locator;
    expMonth: Locator;
    expYear: Locator;
    cvc: Locator;
    cardHolder: Locator;
    countryPicker: Locator;
    loggedUser: Locator;
    placeOrder: Locator;
    dropdown: Locator;

    page: Page;
    constructor(page){
        this.cardField = page.locator('input[type="text"]').first();
        this.expMonth = page.getByRole('combobox').first();
        this.expYear = page.getByRole('combobox').nth(1);
        this.cvc = page.locator('input[type="text"]').nth(1);
        this.cardHolder = page.locator('input[type="text"]').nth(2);
        this.countryPicker = page.locator("[placeholder*='Country']");
        this.loggedUser = page.locator('.user__name [type="text"]').first();
        this.placeOrder = page.locator("text=PLACE ORDER");
        this.dropdown = page.locator('.ta-results');
    }
    async filterThroughCountries(country) {
        for (let i = 0; i < await this.dropdown.locator('button').count(); ++i) {
            if (await this.dropdown.locator('button').nth(i).textContent() === country) {
                await this.dropdown.locator('button').nth(i).click();
                break;
            };
        };
    }
}
