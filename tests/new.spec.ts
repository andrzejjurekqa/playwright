import { test, expect } from '@playwright/test';
import { page, }

test.beforeEach(async ({page}) => {
  await page.goto('https://www.saucedemo.com');
});

test.describe('Verify the Login screen', () => {
    test('Verify the title', async ({page}) => {
        await expect(page).toHaveTitle(/Swag Labs/);
    });
    test('Verify input fields', async ({page}) => {
        await expect(page.locator('#user-name')).toHaveText('Username');
        await expect(page.locator('#password')).toHaveText('Password');
    });
    test('Verify the login button', async ({page}) => {
        await expect(page).toHaveId(/login-button/)
    });
});

test.afterAll(async () => {
    console.log('Done with tests');
});