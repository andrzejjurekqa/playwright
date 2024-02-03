import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Verify the Login screen', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://www.saucedemo.com');
    });

    test('Verify the title', async ({page}) => {
        await expect(page).toHaveTitle('Swag Labs');
    });
    test('Incorrect login', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('asdasd', 'sdaasddas');
        await LoginPage.error;
    });
    test('Correct login', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('problem_user', 'secret_sauce');
        await LoginPage.title;
    });
});