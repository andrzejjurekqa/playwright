import { test, expect } from '@playwright/test';
import * as postData from '../test-data/reqres-post.json';

test.describe('Verify mock API call', () => {
    test('Verify mocked post', async ({ page }) => {
        await page.route('**/users', async (route) => {
            await route.fulfill({ postData });
        })
        test.setTimeout(120000);
        await page.goto('https://reqres.in/');
        await expect(page.getByText('morpheus')).toBeVisible();
    });
});