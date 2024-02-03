import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Verify the Login screen', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://www.saucedemo.com');
    });

    test('Verify the login page', async ({page}) => {
        const loginPage = new LoginPage(page);
        await expect(page).toHaveTitle('Swag Labs');
        await expect(loginPage.usernameField).toBeVisible();
        await expect(loginPage.passwordField).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
    });
    test('Incorrect login', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('asdasd', 'sdaasddas');
        await expect(loginPage.errorMessage).toHaveText(/Username and password do not match any user in this service/);
    });
    test('Correct login', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('problem_user', 'secret_sauce');
        const title = page.locator('.title');
        await expect(title).toHaveText('Products');
    });
});