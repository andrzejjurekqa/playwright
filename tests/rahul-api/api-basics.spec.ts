import { request, expect, test } from "@playwright/test";
import { APICalls } from "../../pages/rahul-api.page";
const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const orderPayload = { orders: [{ country: "Barbados", productOrderedId: "6581ca399fd99c85e8ee7f45" }] };

let response;

test.beforeAll( async () => {
    const apiContext = await request.newContext();
    let newAPICalls = new APICalls(apiContext, loginPayload);
    newAPICalls.loginApi();
    response = await newAPICalls.orderApi(orderPayload);
});

test.beforeEach( () => {
});

test('Client App Login', async ({ page }) => {
    page.addInitScript( value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId!.includes(rowOrderId!)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    };
    await page.locator('.tagline').waitFor();
    await expect(page.locator('.tagline')).toHaveText('Thank you for Shopping With Us');
    await expect(page.locator('.col-text')).toHaveText(response.orderId);
});