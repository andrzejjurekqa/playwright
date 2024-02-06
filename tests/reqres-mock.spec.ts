import { test, expect } from '@playwright/test';
import { data } from '../test-data/reqres-post.json';

test.describe('Verify mock API call', () => {
    test('Verify mocked post', async ({ page }) => {
        await page.route('**/users', async (route) => {
            await route.fulfill({ data });
        })
        await page.goto('https://reqres.in/');
        await expect(page.getByText('morpheus')).toBeVisible();
    });
});