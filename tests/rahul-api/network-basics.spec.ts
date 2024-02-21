import { request, expect, test } from "@playwright/test";
import { APICalls } from "../../pages/rahul-api.page";
const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const orderPayload = { orders: [{ country: "Barbados", productOrderedId: "6581ca399fd99c85e8ee7f45" }] };
const fakeResponse = { data: [], message: "No Orders" };
const baseUrl = 'https://rahulshettyacademy.com/';

let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    let newAPICalls = new APICalls(apiContext, loginPayload);
    newAPICalls.loginApi();
    response = await newAPICalls.orderApi(orderPayload);
});

test.beforeEach(() => {
});

test('Client App Login', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto(`${baseUrl}/client`);

    page.route(
        `${baseUrl}api/ecom/order/get-orders-for-customer/*`,
        async route => {
            //intercepting the response
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakeResponse);
            route.fulfill({
                response,
                body,
            });
        });
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse(`${baseUrl}api/ecom/order/get-orders-for-customer/*`);
    console.log(await page.locator(".mt-4").textContent());

});