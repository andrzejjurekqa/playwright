import { test, expect } from "@playwright/test";
import { beforeEach } from "node:test";

test.describe('E2E', () => {
    test('Valid registration', async ({ page }) => {
        await page.goto('https://todo.qacart.com/signup')
        await expect(page.locator('.ktReoZ')).toHaveText('Register to Application');
        let userName = 'TestName' + Math.floor(Math.random() * 1000);
        await page.locator('input').nth(0).fill(userName);
        await page.locator('input').nth(1).fill('Test Surname');
        await page.locator('input').nth(2).fill(userName + '@gmail.com');
        await page.locator('input').nth(3).fill('InvalidPassword');
        await page.locator('input').nth(4).fill('InvalidPassword');
        await page.getByRole('button').filter({ hasText: "Signup" }).click();
        await expect(page.locator('.sc-dIouRR')).toContainText(userName);

        await page.getByTestId('add').click();
        await expect(page.getByTestId('header')).toHaveText('Create a new Todo');
        await page.locator('input').fill('To do' + userName);
        await page.getByTestId('submit-newTask').click();
        await expect(page.locator('.sc-evZas')).toHaveText('To do' + userName);

        await page.getByRole('checkbox').click();
        await expect(page.getByRole('checkbox')).toBeChecked();
        await page.getByTestId('delete').click();
        await expect(page.getByTestId('todo-item')).toHaveCount(0);

        await page.getByRole('button').filter({ hasText: "Logout" }).click();
        await expect(page.locator('.header')).toHaveText('Login to Application');
    });
});

