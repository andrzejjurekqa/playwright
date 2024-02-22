import { test, expect } from "@playwright/test"
import { POManager } from '../../pages/POManager.page'
import orderData from '../../test-data/order-details.json';
const dataSet = JSON.parse(JSON.stringify(orderData));

for (const data of dataSet) {

    test(`Client App Login for ${data.cardnumber}`, async ({ page }) => {
        const poManager = new POManager(page);
        await poManager.getLoginPage();
        await poManager.loginPage.validCredentials();

        await page.waitForLoadState('networkidle');
        await poManager.dashboardPage.addToCart(data.productName);
        await poManager.dashboardPage.shoppingCart.click();

        await page.waitForLoadState('networkidle');
        await poManager.cartPage.cartItem.first().waitFor();
        await poManager.cartPage.checkoutButton.click();
    
        await poManager.checkoutPage.cardField.first().clear();
        await poManager.checkoutPage.cardField.fill(data.cardnumber);
        await poManager.checkoutPage.expMonth.selectOption(data.expMonth);
        await poManager.checkoutPage.expYear.selectOption(data.expYear);
        await poManager.checkoutPage.cvc.fill(data.cvc);
        await poManager.checkoutPage.cardHolder.fill(data.cardHolder);
        await poManager.checkoutPage.countryPicker.pressSequentially(data.country);
        await poManager.checkoutPage.dropdown.waitFor();
        poManager.checkoutPage.filterThroughCountries(data.country);
        await expect(poManager.checkoutPage.loggedUser).toHaveText('anshika@gmail.com');
        await poManager.checkoutPage.placeOrder.click();
        await expect(page.locator('div').filter({ hasText: 'Order Placed Successfully' }).nth(2)).toBeVisible();
        await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
        const orderNumber = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
        console.log(orderNumber);
        await page.locator("button[routerlink*='myorders']").click();
        await page.locator("tbody").waitFor();
        const rows = await page.locator("tbody tr");


        for (let i = 0; i < await rows.count(); ++i) {
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if (orderNumber!.includes(rowOrderId!)) {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        };
        await page.locator('.tagline').waitFor();
        await expect(page.locator('.tagline')).toHaveText('Thank you for Shopping With Us');
        function splitMulti(str, tokens): [] {
            var tempChar = tokens[0]; // We can use the first token as a temporary join character
            for (var i = 1; i < tokens.length; i++) {
                str = str.split(tokens[i]).join(tempChar);
            }
            str = str.split(tempChar);
            return str;
        };
        const newOrderNumber = splitMulti(orderNumber!, ['|', ' ']).slice(3, 4).toString();//!! IMPORTANT
        console.log(newOrderNumber);
        await expect(page.locator('.col-text')).toHaveText(newOrderNumber!);
    });
}