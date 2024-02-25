import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

test.setTimeout(120000);
test.describe('Verify the Login screen', () => {
    let loginPage;
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await page.goto('https://www.saucedemo.com');
        await page.waitForLoadState('networkidle');
    })

    test('Verify the login page', async ({ page }) => {
        await expect(page).toHaveTitle('Swag Labs');
        await expect(loginPage.usernameField).toBeVisible();
        await expect(loginPage.passwordField).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
    });
    test('Incorrect login', async ({ page }) => {
        await loginPage.login('fake', 'password');
        await expect(loginPage.errorMessage).toHaveText(/Username and password do not match any user in this service/);
    });
    test('Correct login', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page.locator('.title')).toHaveText('Products');
    });
});