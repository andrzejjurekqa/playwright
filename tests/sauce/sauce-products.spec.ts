import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { ProductPage } from '../../pages/products.page';

let loginPage;
let productPage;

test.describe('Verify products page', () => {
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        await page.goto('https://www.saucedemo.com');
        await loginPage.login('standard_user', 'secret_sauce');
    });
    test('Verify product page', async ({ page }) => {
        await expect(productPage.sortingButton).toBeVisible();
        await expect(productPage.shoppingCart).toBeVisible();
        await productPage.shoppingCart.click();
        await expect(page.locator('.title')).toHaveText('Your Cart');
    });
    test('Verify products can be sorted', async ({ page }) => {
        await productPage.sort('Name (A to Z)');
        await productPage.sort('Name (Z to A)');
        await productPage.sort('Price (high to low)');
        await productPage.sort('Price (low to high)');
    })
    test.only('Verify products can be added to the list', async ({ page }) => {
        await productPage.addToCart('Sauce Labs Backpack');
        await productPage.shoppingCart.click();
        await expect(page.locator('.title')).toHaveText('Your Cart');
        await expect(page.locator('.cart_item_label')).toContainText('Sauce Labs Backpack');
        await page.getByRole('button').nth(1).click();
        await expect(page.locator('.cart_item_label')).toHaveCount(0);
    });
});