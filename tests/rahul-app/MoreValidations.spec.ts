import { test, expect } from "@playwright/test";

test('More Validations', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    await page.locator('#confirmbtn').click();
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#confirmbtn').click();
    page.on('dialog', dialog => dialog.dismiss());
    await page.locator('#mousehover').hover();
    await page.getByText('Top').click();

    ////IMPORTANT IFRAMES
    const frame = page.frameLocator('#courses-iframe');
    await frame.locator('li a[href*="lifetime-access"]:visible').click();
    const string1 = await frame.locator('.text h2').textContent().toString().split(' ')[1];

    console.log(string1);
});

test('Screenshots', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#displayed-text').screenshot({ path: 'screenshot.png' });
    await page.locator('#hide-textbox').click();
    await page.screenshot({path: 'screenshot.png'});
    await expect(page.locator('#displayed-text')).toBeHidden();
});

test('Visual comparison', async ({ page }) => {
    await page.goto('https://flightaware.com/');
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
});