import { test, expect } from "@playwright/test";

test('Some Api Test', async ({page}) =>{
    await page.route('asdasdasd/apiendpoint', async route => {
        await page.request.fetch(route.request());
        route.fulfill({
            contentType: 'application/json',
            body: JSON.stringify({ }),
        });
        await page.goto('asdasdasd');
    });
});