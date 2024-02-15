import { test, expect } from '@playwright/test';


test.describe('Google Suite', () => {
    test('Go to Google', async ({ page }) => {
        await page.goto("https://www.google.com");
        await page.waitForLoadState('networkidle');
        await page.locator('#W0wltc').click();
        await expect(page).toHaveTitle('Google');
        await page.locator('#APjFqb').fill('playwright');
        await page.keyboard.press('Enter');
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveTitle('Google');
    });
});