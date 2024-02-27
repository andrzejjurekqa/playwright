import { test, expect } from "@playwright/test";
const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };


test('Login with API', async ({ request, context, page }) => {
    let response = await request.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
        data: loginPayload
    });
    let responseBody = await response.json();
    console.log(responseBody);
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, responseBody.token);
    await page.goto('https://rahulshettyacademy.com/client/');
    await expect(page.locator('.card-body').first()).toContainText('ZARA COAT 3');
});