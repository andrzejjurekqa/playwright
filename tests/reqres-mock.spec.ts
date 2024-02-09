import { test, expect } from '@playwright/test';
import * as postData from '../test-data/reqres-post.json';

test.describe('Verify mock API call', () => {
    test('Verify mocked post', async ({ page }) => {
        await page.route('**api/users', async (route) => {
            await route.fulfill({
                status: 201,
                contentType: 'application/json',
                body: '{name: "morpheus", job: "leader"}'
              });
        })
        await page.goto('https://reqres.in/api/users');
        await expect(page.getByText('morpheus')).toBeVisible();
    });
});