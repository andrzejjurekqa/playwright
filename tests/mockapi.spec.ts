import { test, expect } from '@playwright/test';

test.describe('Verify mock API call', () => {
    test('Verify mocked post', async ({ page }) => {
        await page.route('*/**/api/users', async (route) => {
            const json = { "data": {'name': 'morpheus', 'job': 'leader'}};
            await route.fulfill(json);
        })
        await page.goto('https://reqres.in/users');
        await expect(page.getByText('morpheus')).toBeVisible();
    })
})