import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductPage } from '../pages/products.page';

test.describe('Verify products page', () => {
    let loginPage;
    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await page.goto('https://www.saucedemo.com');
        await loginPage.login('problem_user', 'secret_sauce');
    });
})