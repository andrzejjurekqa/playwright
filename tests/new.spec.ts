import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
});

test('Verify the title', async ({page}) => {
    await expect(page).toHaveTitle(/Swag Labs/);
});