import { test, expect } from '@playwright/test';
import { RahulPage } from '../pages/rahul-login.page';

test.describe('First Playwright Test Describe', () => {
    let loginPage;
    test.beforeEach(async ({page}) => {
        loginPage = new RahulPage(page);
        await page.goto("https://sso.teachable.com/secure/9521/identity/login/password");
    });
    test('First Playwright Test - Login Invalid', async ({ page })=> { 
        await loginPage.provideInvCredentials();
        await expect(loginPage.invalidMessage).toHaveText('Invalid');
    });
    test('First Playwright Test - Login Valid', async ({ page }) => {
        await loginPage.provideValidCredentials();
        await expect(loginPage.invalidMessage).toHaveText('Valid');
    });
});

/*
Rahul page that was deprecated
1. Login
2. page.waitForLoadState('networkidle');
3. page.locator(".class a").allTextContents();
3. page.locator(".class a").nth(0).textContent();
*/