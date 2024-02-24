import { expect, test } from "@playwright/test";

test.describe('Login Page Tests', () => {
    test.beforeEach('go to page', async ({page}) => {
        await page.goto('https://todo.qacart.com/');
        await expect(page.locator('.header')).toHaveText('Login to Application');
    });
    test('Invalid Login', async ({ page }) => {
        await page.locator('#email').fill('invalidemail@gmail.com');
        await page.locator('#password').fill('invalidpassword');
        await page.locator('#submit').click();
        await expect(page.getByRole('alert')).toContainText('We could not find the email in the database');
    });
    test('Missing Password', async ({ page }) => {
        await page.locator('#email').fill('invalidemail@gmail.com');
        await page.locator('#submit').click();
        await expect(page.locator('#password-helper-text')).toHaveText('Password must be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character');
    });
    test('Invalid Email Format', async ({ page }) => {
        await page.locator('#email').fill('invalidemail');
        await page.locator('#submit').click();
        await expect(page.locator('#email-helper-text')).toHaveText('Please Insert a correct Email format');
    });
    test('Go to signup', async ({ page }) => {
        await page.getByText('Create a new Account?').click();
        await expect(page.locator('.ktReoZ')).toHaveText('Register to Application');
    });
});