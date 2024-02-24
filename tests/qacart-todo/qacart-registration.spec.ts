import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe('Registration Screen Test', () =>{
    test.beforeEach('Go to Registration Screen', async ({page})=> {
        await page.goto('https://todo.qacart.com/signup')
        await expect(page.locator('.ktReoZ')).toHaveText('Register to Application');
    });
    test('No email, pass, pass2', async ({page}) => {
        await page.locator('input').nth(0).fill(faker.person.firstName());
        await page.locator('input').nth(1).fill('Test Surname');
        await page.getByRole('button').filter({ hasText: "Signup" }).click();
        await expect(page.locator('.MuiFormHelperText-root')).toHaveText('Please Insert a correct Email format');
        await page.locator('input').nth(2).fill(faker.internet.email());
        await page.getByRole('button').filter({ hasText: "Signup" }).click();
        await expect(page.locator('.MuiFormHelperText-root')).toHaveText('Password must be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character');
        await page.locator('input').nth(3).fill('InvalidPassword');
        await page.getByRole('button').filter({ hasText: "Signup" }).click();
        await expect(page.locator('.MuiFormHelperText-root')).toHaveText('Second password does not match the first Password');
    });
    test('Email already exists', async ({ page }) => {
        await page.locator('input').nth(0).fill('Test Name');
        await page.locator('input').nth(1).fill('Test Surname');
        await page.locator('input').nth(2).fill('newemail@email.com');
        await page.locator('input').nth(3).fill('InvalidPassword');
        await page.locator('input').nth(4).fill('InvalidPassword');
        await page.getByRole('button').filter({ hasText: "Signup" }).click();
        await expect(page.getByRole('alert')).toContainText('Email is already exists in the Database');
    });
    test('Valid registration', async ({ page }) => {
        let userName = 'TestName' + Math.floor(Math.random() * 1000);
        await page.locator('input').nth(0).fill(userName);
        await page.locator('input').nth(1).fill('Test Surname');
        await page.locator('input').nth(2).fill(userName + '@gmail.com');
        await page.locator('input').nth(3).fill('InvalidPassword');
        await page.locator('input').nth(4).fill('InvalidPassword');
        await page.getByRole('button').filter({ hasText: "Signup" }).click();
        await expect(page.locator('.sc-dIouRR')).toHaveText('Good afternoon ' + userName);
    });
});

