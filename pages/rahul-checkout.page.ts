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
        this.placeOrder = page.getByText('Place Order');
        this.dropdown = page.locator('.ta-results');
    }
    async filterThroughCountries(countryCode, countryName) {
        await this.countryPicker.pressSequentially(countryCode);
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; ++i) {
            const text = await this.dropdown.locator("button").nth(i).textContent();
            if (text!.trim() === countryName) {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }
    }
}
