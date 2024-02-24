import { test, expect } from "@playwright/test";
import { beforeEach } from "node:test";

test.describe('Registration Screen Test', () =>{
    test.beforeEach('Go to Registration Screen', async ({page})=> {
        await page.goto('https://todo.qacart.com/signup')
        await expect(page.locator('.ktReoZ')).toHaveText('Register to Application');
    });
    test('No email', async ({page}) => {
        await page.locator('input').nth(0).fill('Test Name');
        await page.locator('input').nth(1).fill('Test Surname');
        await page.getByRole('button').filter({ hasText: "Signup" }).click();
        await expect(page.locator('.MuiFormHelperText-root').nth(2)).toHaveText('Please Insert a correct Email format');
    });
    test('No password', async ({ page }) => {
        await page.locator('input').nth(0).fill('Test Name');
        await page.locator('input').nth(1).fill('Test Surname');
        await page.locator('input').nth(2).fill('Invalid@gmail.com');
        await page.getByRole('button').filter({ hasText: "Signup" }).click();
        await expect(page.locator('.MuiFormHelperText-root')).toHaveText('Password must be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character');
    });
});

