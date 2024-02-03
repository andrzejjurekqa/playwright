import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductPage } from '../pages/products.page';

test.describe('Verify products page', () => {
    let loginPage;
    let productPage;
    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        await page.goto('https://www.saucedemo.com');
        await loginPage.login('problem_user', 'secret_sauce');
    })
    test.afterAll(async () =>{
        console.log('Done');
    })

    test('Verify product page', async ({page}) => {
        const title = page.locator('.title');
        await expect(title).toHaveText('Products');
        await expect(productPage.sortingButton).toBeVisible();
        await expect(productPage.shoppingCart).toBeVisible();
    })
})