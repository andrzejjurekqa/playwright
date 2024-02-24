import { test, expect, request } from "@playwright/test";
import { APIqaCart } from "../../pages/qacart-api.page";
const logPayload = { email: "newemail3@email.com", password: "Password1234" };
const taskPayload = { item: "wert", isCompleted: false };

let response;

test.beforeAll('Api Login', async () => {
    const apiContext = await request.newContext();
    let qacart = new APIqaCart(apiContext, logPayload);
    await qacart.loginApi();
});

test('Log in and create a task', async ({ page }) => {
    await page.goto('https://todo.qacart.com/todo');
    await expect(page.locator('.sc-dIouRR')).toHaveText('Good afternoon ');
});